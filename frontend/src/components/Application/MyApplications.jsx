import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const url =
          user?.role === "Employer"
            ? `${import.meta.env.VITE_API_URL}/api/v1/application/employer/getall`
            : `${import.meta.env.VITE_API_URL}/api/v1/application/jobseeker/getall`;

        const res = await axios.get(url, { withCredentials: true });
        setApplications(res.data.applications);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch applications");
      }
    };

    if (isAuthorized && user) {
      fetchApplications();
    }
  }, [isAuthorized, user]);

  if (!isAuthorized) return null;

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setApplications((prev) => prev.filter((application) => application._id !== id));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <section className="my_applications page">
      <div className="container">
        <center>
          <h1>{user?.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}</h1>
        </center>

        {applications.length === 0 ? (
          <center><h4>No Applications Found</h4></center>
        ) : (
          applications.map((element) =>
            user?.role === "Job Seeker" ? (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ) : (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            )
          )
        )}
      </div>

      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
    </section>
  );
};

export default MyApplications;

// JobSeekerCard component
const JobSeekerCard = ({ element, deleteApplication, openModal }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>CoverLetter:</span> {element.coverLetter}</p>
    </div>
    <div className="resume">
      <img
        src={element.resume.url}
        alt="resume"
        onClick={() => openModal(element.resume.url)}
      />
    </div>
    <div className="btn_area">
      <button onClick={() => deleteApplication(element._id)}>
        Delete Application
      </button>
    </div>
  </div>
);

// EmployerCard component
const EmployerCard = ({ element, openModal }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>CoverLetter:</span> {element.coverLetter}</p>
    </div>
    <div className="resume">
      <img
        src={element.resume.url}
        alt="resume"
        onClick={() => openModal(element.resume.url)}
      />
    </div>
  </div>
);



     
  
