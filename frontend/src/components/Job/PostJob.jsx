import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    salaryFrom: "",
    salaryTo: "",
    fixedSalary: "",
    salaryType: "default",
  });

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJobPost = async (e) => {
    e.preventDefault();

    const { salaryType, fixedSalary, salaryFrom, salaryTo } = formData;

    const payload =
      salaryType === "Fixed Salary"
        ? { ...formData, salaryFrom: "", salaryTo: "" }
        : salaryType === "Ranged Salary"
        ? { ...formData, fixedSalary: "" }
        : { ...formData, salaryFrom: "", salaryTo: "", fixedSalary: "" };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/job/post`,
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Job post failed.");
    }
  };

  return (
    <div className="job_post page">
      <div className="container">
        <h3>Post New Job</h3>
        <form onSubmit={handleJobPost}>
          <div className="wrapper">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Job Title"
            />
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Frontend Web Development">Frontend Web Development</option>
              <option value="Business Development Executive">Business Development Executive</option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">MEAN Stack Development</option>
              <option value="MERN Stack Development">MERN Stack Development</option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>

          <div className="wrapper">
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
          />

          <div className="salary_wrapper">
            <select name="salaryType" value={formData.salaryType} onChange={handleChange}>
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>

            <div>
              {formData.salaryType === "default" && <p>Please provide Salary Type *</p>}

              {formData.salaryType === "Fixed Salary" && (
                <input
                  type="number"
                  name="fixedSalary"
                  placeholder="Enter Fixed Salary"
                  value={formData.fixedSalary}
                  onChange={handleChange}
                />
              )}

              {formData.salaryType === "Ranged Salary" && (
                <div className="ranged_salary">
                  <input
                    type="number"
                    name="salaryFrom"
                    placeholder="Salary From"
                    value={formData.salaryFrom}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="salaryTo"
                    placeholder="Salary To"
                    value={formData.salaryTo}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            rows="6"
          ></textarea>

          <button type="submit">Post Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;

  
   


                
