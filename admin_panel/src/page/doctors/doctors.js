import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/wrapper";
import { doctorData } from "../../data/data";

import {
  FiFacebook,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
} from "../../assets/icons/vander";
import useAxios from "../../network/useAxios";
import { fetchAllDoctors } from "../../urls/urls";
import { test_url_images } from "../../config/environment";
import DepartmentSearch from "../../common-components/DepartmentSearch";
import HospitalNameSearch from "../../common-components/HospitalName";
import StatusSearch from "../../common-components/StatusSearch";
import AppointmentSlots from "../../common-components/SlotsSearch";
import DateSearchComponent from "../../common-components/DateSearch";
import DoctorSearch from "../../common-components/DoctorsSearch";
import PatientName from "../../common-components/PatientName";

export default function Doctors() {
  const [doctorsData, setDoctorsData] = useState([]);
  const [
    patientListResponse,
    patientListError,
    patientListLoading,
    patientListFetch,
  ] = useAxios();
  const [filters, setFilters] = useState({
  })
  useEffect(() => {
    patientListFetch(fetchAllDoctors(filters));
  }, [filters]);
  useEffect(() => {
    if (patientListResponse?.result == "success" && patientListResponse?.data) {
      setDoctorsData(patientListResponse?.data);
    }
  }, [patientListResponse]);
  return (
        <Wrapper>
            <div className="container-fluid">
                <div className="layout-specing">
                    <div className="row">
                        <div className="col-xl-9 col-md-6">
                            <h5 className="mb-0">Doctors</h5>

                            <nav aria-label="breadcrumb" className="d-inline-block mt-2">
                                <ul className="breadcrumb breadcrumb-muted bg-transparent rounded mb-0 p-0">
                                    <li className="breadcrumb-item">
                    <Link to="/">UJUR</Link>
                  </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                    Doctors
                  </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="col-xl-3 col-md-6 mt-4 mt-md-0 text-md-end">
                            <Link to="/add-doctor" className="btn btn-primary">
                Add New Doctor
              </Link>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "1rem" }}>

                                <div className="col-sm-6 col-lg-3">
                                    <DoctorSearch filters={filters} setFilters={setFilters} />
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                        <HospitalNameSearch filters={filters} setFilters={setFilters} />

                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                        <DepartmentSearch filters={filters} setFilters={setFilters} />

                                    </div>
                                    <div className="col-sm-6 col-lg-3">
                                       <button
                                        className="form-control btn-check-reset"
                                        onClick={()=>{
                                            setFilters({
                                                department:"",
                                                hospitalSearch:"",
                                                doctorName:"",
                                            })
                                        }}
                                        style={{backgroundColor:"red"}}
                                       >Reset</button>

                                    </div>
                                </div>
                                
                             
                    <div className="row row-cols-md-2 row-cols-lg-5">

                        {doctorsData?.map((item, index) => {
                            return (
                                <div className="col mt-4" key={index}>
                                    <div className="card team border-0 rounded shadow overflow-hidden">
                                        <div className="team-img position-relative">
                                            <img
                        src={test_url_images + item?.profile_picture}
                        className="img-fluid"
                        alt=""
                      />
                                        </div>
                                        <div className="card-body content text-center">
                                            <Link
                        to={`/dr-profile/${item.id}`}
                        className="title text-dark h5 d-block mb-0"
                      >
                        {item.full_name}
                      </Link>
                                            <small
                        className="text-muted speciality"
                      >
                        {item.education}
                      </small>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
