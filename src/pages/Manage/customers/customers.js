import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import * as moment from "moment";

// Import Images
import dummyImg from "../../../assets/images/users/user-dummy-img.jpg";

import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  ModalFooter,
  Table,
  FormFeedback,
  Spinner
} from "reactstrap";
import Select from "react-select";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import SaveLoader from "../../../Components/Common/SaveLoader";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { ADD_CONTACT_RESET } from "../../../store/category/actionType";

//Import actions
import {
  getCategoryAction,
  addNewCategory,
  updateCategory,
  deleteCustomer as onDeleteContact,
} from "../../../store/actions";
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import Loader from "../../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Export Modal
import ExportCSVModal from "../../../Components/Common/ExportCSVModal";

const ManageCategories = () => {
  const dispatch = useDispatch();
  const { categories, isCatCreated,loading, isContactSuccess, error,updateloadding,saveloadding,isContactDelete,isContactDeleteFail } = useSelector((state) => ({
    categories: state.Category.categories,
    isCatCreated: state.Category.isCatCreated,
    isContactSuccess: state.Category.isContactSuccess,
    error: state.Category.error,
    loading:state.Category.loading,
    updateloadding:state.Category.updateloadding,
    saveloadding:state.Category.saveloadding,
    isContactDelete:state.Category.isContactDelete,
    isContactDeleteFail:state.Category.isContactDeleteFail

    
  }));

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  useEffect(() => {
    setContact(categories);
  }, [categories]);

  useEffect(() => {
    if (!isEmpty(categories)) {
      setContact(categories);
      setIsEdit(false);
    }
  }, [categories]);


  const [isEdit, setIsEdit] = useState(false);
  const [contact, setContact] = useState([]);


  //delete Conatct
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  const [modal, setModal] = useState(false);
  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setContact(null);
      setIsEdit(false)
    } else {
      setModal(true);
      setTag([]);
      setAssignTag([]);
    }
  }, [modal]);

  // Delete Data
  const handleDeleteContact = () => {
    if (contact) {
    let payload = {
      del:1,
      user_id:contact.user_id
    }
    dispatch(onDeleteContact(payload));
      setDeleteModal(false);
    }
  };

  const onClickDelete = (contact) => {
    setContact(contact);
    setDeleteModal(true);
  };

  // Add Data
  const handleContactClicks = () => {
    setContact("");
    setIsEdit(false);
    toggle();
  };


  // Date & Time Format

  const dateFormat = () => {
    var d = new Date(),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear());
  };

  const timeFormat = () => {
    let d = new Date();
    let minutes = d.getMinutes().toString().length === 1 ? '0' + d.getMinutes() : d.getMinutes();
    let hours = (d.getHours().toString() % 12) || 12;
    hours = (hours <= 9) ? hours = ("0" + hours) : hours;
    let ampm = d.getHours() >= 12 ? 'PM' : 'AM';
    return (hours + ':' + minutes + ampm);
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // img: (contact && contact.img) || '',
      full_name: (contact && contact.full_name) || '',
      phone_number:(contact && contact.phone_number) || '',
      email: (contact && contact.email) || '',
      status:(contact && contact.status) || '',
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required("Please provide full name"),
      phone_number: Yup.number().required("Please provide phone number"),
      email: Yup.string().required("Please provide email"),
      status: Yup.number().required("Please whitelist /block"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        // update Contact
        values.user_id = contact.user_id

      dispatch(updateCategory(values));
        validation.resetForm();
      } else {
        // save new Contact
        dispatch(addNewCategory(values));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Update Data
  const handleContactClick = useCallback((arg) => {
    const contact = arg;
    setContact(contact);

    setIsEdit(true);
    toggle();
  }, [toggle]);

  // Node API 
  useEffect(() => {
    if (isCatCreated) {
      setContact(null);
      dispatch(getCategoryAction());
      dispatch({ type: ADD_CONTACT_RESET });
    }
  }, [
    dispatch,
    isCatCreated,
  ]);

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const handleValidTime = (time) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    var meridiem = "";
    if (getHour >= 12) {
      meridiem = "PM";
    } else {
      meridiem = "AM";
    }
    const updateTime = moment(getTime, 'hh:mm').format('hh:mm') + " " + meridiem;
    return updateTime;
  };

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".contactCheckBox");

    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);

  const deleteMultiple = () => {
    const checkall = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element) => {
      dispatch(onDeleteContact(element.value));
      setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".contactCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  // Column
  const columns = useMemo(
    () => [
      {
        Header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        Cell: (cellProps) => {
          return <input type="checkbox" className="contactCheckBox form-check-input" value={cellProps.row.original._id} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
      },
   
      {
        Header: "Name",
        accessor: "full_name",
        filterable: true,
      },
      {
        Header: "Phone",
        accessor: "phone_number",
        filterable: true,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (cell) => {
          switch (cell.value) {
            case 1:
              return <span className="badge text-uppercase badge-soft-success"> Whitelisted </span>;
            case 0:
              return <span className="badge text-uppercase badge-soft-danger"> Blocked </span>;
            default:
              return <span className="badge text-uppercase badge-soft-info"> {cell.value} </span>;
          }
        }
      },
   
      {
        Header: "CreatedAt",
        Cell: (contact) => (
          <>
            {handleValidDate(contact.row.original.date_registered)},{" "}
            <small className="text-muted">{handleValidTime(contact.row.original.date_registered)}</small>
          </>
        ),
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              {/* <li className="list-inline-item edit" title="Call">
                <Link to="#" className="text-muted d-inline-block">
                  <i className="ri-phone-line fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item edit" title="Message">
                <Link to="#" className="text-muted d-inline-block">
                  <i className="ri-question-answer-line fs-16"></i>
                </Link>
              </li> */}
              <li className="list-inline-item">
                <UncontrolledDropdown>
                  <DropdownToggle
                    href="#"
                    className="btn btn-soft-secondary btn-sm dropdown"
                    tag="button"
                  >
                    <i className="ri-more-fill align-middle"></i>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem className="dropdown-item" href="#"
                      onClick={() => { const contactData = cellProps.row.original; setInfo(contactData); }}
                    >
                      <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                      View
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item edit-item-btn"
                      href="#"
                      onClick={() => { const contactData = cellProps.row.original; handleContactClick(contactData); }}
                    >
                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item remove-item-btn"
                      href="#"
                      onClick={() => { const contactData = cellProps.row.original; onClickDelete(contactData); }}
                    >
                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleContactClick, checkedAll]
  );


  const [tag, setTag] = useState([]);
  const [assignTag, setAssignTag] = useState([]);

  const statusList = [
    { label: "Whitelist", value: 1 },
    { label: "Block", value: 0 },
  ];

  // SideBar Contact Deatail
  const [info, setInfo] = useState([]);

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState(false);

  document.title = "Contact | USSDBUY - ADMINUI";
  
  return (
    <React.Fragment>
      <div className="page-content">
        <ExportCSVModal
          show={isExportCSV}
          onCloseClick={() => setIsExportCSV(false)}
          data={categories}
        />

        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteContact}
          onCloseClick={() => setDeleteModal(false)}
        />

        <DeleteModal
          show={deleteModalMulti}
          onDeleteClick={() => {
            deleteMultiple();
            setDeleteModalMulti(false);
          }}
          onCloseClick={() => setDeleteModalMulti(false)}
        />

        <Container fluid>
          <BreadCrumb title="Contacts" pageTitle="MANAGE" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <div className="flex-grow-1">
                      <button
                      disabled={updateloadding || saveloadding  === true ? true:false}
                        className="btn btn-info add-btn"
                        onClick={() => {
                          setModal(true);
                        }}
                      >
                     {updateloadding || saveloadding  === true ? '':<i className="ri-add-fill me-1 align-bottom"></i>}
                     {updateloadding || saveloadding  === true ? '':'Add Contacts'}
                     {updateloadding || saveloadding  === true ?  <SaveLoader/>:''}
                      </button>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="hstack text-nowrap gap-2">
                        {isMultiDeleteButton && <button className="btn btn-soft-danger"
                          onClick={() => setDeleteModalMulti(true)}
                        ><i className="ri-delete-bin-2-line"></i></button>}
                        {/* <button className="btn btn-danger">
                          <i className="ri-filter-2-line me-1 align-bottom"></i>{" "}
                          Filters
                        </button> */}
                        <button className="btn btn-soft-success" onClick={() => setIsExportCSV(true)}>Export</button>

                        {/* <UncontrolledDropdown>
                          <DropdownToggle
                            href="#"
                            className="btn btn-soft-info"
                            tag="button"
                          >
                            <i className="ri-more-2-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem className="dropdown-item" href="#">All</DropdownItem>
                            <DropdownItem className="dropdown-item" href="#">Last Week</DropdownItem>
                            <DropdownItem className="dropdown-item" href="#">Last Month</DropdownItem>
                            <DropdownItem className="dropdown-item" href="#">Last Year</DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown> */}

                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Col>
            <Col xxl={9}>
              <Card id="contactList">
                <CardBody className="pt-0">
                  <div>
                    {!loading && categories.length > 0? (
                      <TableContainer
                        columns={columns}
                        data={(categories || [])}
                        isGlobalFilter={true}
                        isAddUserList={false}
                        customPageSize={8}
                        className="custom-header-css"
                        divClass="table-responsive table-card mb-3"
                        tableClass="align-middle table-nowrap"
                        theadClass="table-light"
                        handleContactClick={handleContactClicks}
                        isContactsFilter={true}
                        SearchPlaceholder='Search for users...'
                      />
                    ) : (<Loader error={error} />)
                    }
                  </div>

                  <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                    <ModalHeader className="bg-soft-info p-3" toggle={toggle}>
                      {!!isEdit ? "Edit Contact" : "Add Contact"}
                    </ModalHeader>

                    <Form className="tablelist-form" onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}>
                      <ModalBody>
                        <Input type="hidden" id="id-field" />
                        <Row className="g-3">
                    
                          <Col lg={12}>
                            <div>
                              <Label
                                htmlFor="full_name"
                                className="form-label"
                              >
                                Full Name
                              </Label>
                              <Input
                                name="full_name"
                                id="full_name"
                                className="form-control"
                                placeholder="Enter fullname"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.full_name || ""}
                                invalid={
                                  validation.touched.full_name && validation.errors.full_name ? true : false
                                }
                              />
                              {validation.touched.full_name && validation.errors.full_name ? (
                                <FormFeedback type="invalid">{validation.errors.full_name}</FormFeedback>
                              ) : null}

                            </div>
                          </Col>
                             
                          <Col lg={6}>
                            <div>
                              <Label
                                htmlFor="email"
                                className="form-label"
                              >
                                Email
                              </Label>
                              <Input
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter email"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email && validation.errors.email ? true : false
                                }
                              />
                              {validation.touched.email && validation.errors.email ? (
                                <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                              ) : null}

                            </div>
                          </Col>
                          <Col lg={6}>
                            <div>
                              <Label
                                htmlFor="phone_number"
                                className="form-label"
                              >
                                Phone
                              </Label>
                              <Input
                                name="phone_number"
                                id="phone_number"
                                className="form-control"
                                placeholder="Enter phone number"
                                type="text"
                                validate={{
                                  required: { value: true },
                                }}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone_number || ""}
                                invalid={
                                  validation.touched.phone_number && validation.errors.phone_number ? true : false
                                }
                              />
                              {validation.touched.phone_number && validation.errors.phone_number ? (
                                <FormFeedback type="invalid">{validation.errors.phone_number}</FormFeedback>
                              ) : null}

                            </div>
                          </Col>
                          <Col sm={12}>
                            <div>
                              <Label
                                htmlFor="taginput-choices"
                                className="form-label font-size-13"
                              >
                               Status
                              </Label>
                              <Select
                                name="status"
                                value={statusList.find(function (e) {
                                  return e.value == validation.values.status;
                                })}
                                //  value={statustag}
                                onChange={(e) =>
                                  validation.setFieldValue('status', e.value)
                                }

                                className="mb-0"
                                options={statusList}
                                id="taginput-choices"
                              >
                              </Select>

                              {validation.touched.status &&
                                validation.errors.status ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.status}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                          <button type="button" className="btn btn-light" onClick={() => { setModal(false);setContact(null);setIsEdit(false) }} > Close </button>
                          <button type="submit" className="btn btn-success" id="add-btn"> {!!isEdit ? "Update" : "Save"} </button>
                        </div>
                      </ModalFooter>
                    </Form>
                  </Modal>
                  <ToastContainer closeButton={false} limit={1} />
                </CardBody>
              </Card>
            </Col>

            <Col xxl={3}>
              <Card id="contact-view-detail">
                <CardBody className="text-center">
                  <div className="position-relative d-inline-block">
                    {/* <img
                      src={process.env.REACT_APP_API_URL + "/images/users/" + (info.image_src || "avatar-10.jpg")}
                      alt=""
                      className="avatar-lg rounded-circle img-thumbnail"
                    /> */}
                    <span className="contact-active position-absolute rounded-circle bg-success">
                      <span className="visually-hidden"></span>
                    </span>
                  </div>
      
                </CardBody>
                <CardBody>
                  {/* <h6 className="text-muted text-uppercase fw-semibold mb-3">
                    Personal Information
                  </h6>
                  <p className="text-muted mb-4">
                    Hello, I'm {info.name || "Tonya Noble"}, The most effective objective is one
                    that is tailored to the job you are applying for. It states
                    what kind of career you are seeking, and what skills and
                    experiences.
                  </p> */}
                  <div className="table-responsive table-card">
                    <Table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="fw-medium">
                            Name
                          </td>
                          <td>{info.full_name}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Email ID
                          </td>
                          <td>{info.email }</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Phone No
                          </td>
                          <td>{info.phone_number}</td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Status
                          </td>
                          <td>{info.status === 1 ? <><span className="badge text-uppercase badge-soft-success"> Whitelisted </span></>:<span className="badge text-uppercase badge-soft-danger"> Blocked </span> }</td>
                        </tr>
                     
                        {/* <tr>
                          <td className="fw-medium">
                            Last Contacted
                          </td>
                          <td>
                            {handleValidDate(info.last_contacted || "2021-04-13T18:30:00.000Z")}{" "}
                            <small className="text-muted">{handleValidTime(info.last_contacted || "2021-04-13T18:30:00.000Z")}</small>
                          </td>
                        </tr> */}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ManageCategories;
