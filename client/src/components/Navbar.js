import { faBars, faBell, faSignOutAlt, faHeart, faMoon, faSearch, faSun, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../store/slices/changemodeslice";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { toast } from 'react-toastify';

export default function Navbar(props) {

    // const dispatch = useDispatch()


    // const favCounter = useSelector((state) => {
    //     return state.favoriteproduct.counter
    // })

    // const mode = useSelector((state) => {
    //     return state.mode.darkMode
    // })


    // const handleMode = () => {
    //     dispatch(changeMode())
    // }


    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const { user, dispatch } = useContext(AuthContext);


    const { data: fetchedUser } = useFetch(user ? `/users/${user._id}` : null);

    const isCommitteMember = fetchedUser ? fetchedUser.isCommitteMember : false;

    const isAdmin = fetchedUser ? fetchedUser.isAdmin : false;


    useEffect(() => {

        const handleResize = () => {
            const navBar = document.querySelector('.navbar-collapse');
            if (window.innerWidth <= 768) {
                navBar.classList.add('collapse');
            } else {
                navBar.classList.remove('collapse');
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleToggle = () => {
        const navBar = document.querySelector('.navbar-collapse');
        navBar.classList.toggle('show');
    };



    const navigate = useNavigate()

    const handleLogin = () => {
        navigate("/login")
    }

    const handleRegister = () => {
        navigate("/register")
    }

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        toast.success('Logout successful!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">

            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <h2>EventHub</h2>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={handleToggle}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <div className={`collapse navbar-collapse`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item nav-select">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item nav-select">
                            <a className="nav-link" href="/searchpage">Events</a>
                        </li>
                        <li className="nav-item nav-select">
                            <a className="nav-link" href="#gallery">Gallery</a>
                        </li>
                        {isCommitteMember && <li className="nav-item nav-select">
                            <a className="nav-link" href="/yourevents">My Events</a>
                        </li>}
                        {isAdmin && <li className="nav-item nav-select">
                            <a className="nav-link" href="/admin">Dashboard</a>
                        </li>}
                        <li className="nav-item nav-select">
                            <a className="nav-link" href="/calendar">Event Calendar</a>
                        </li>
                    </ul>

                    {props.isNavbar && (
                         <Link to={"/searchpage"} className="fs-5 me-3" title="Search Events" style={{ textDecoration: 'none', color: "white" }}>
                                <FontAwesomeIcon icon={faSearch} />
                             </Link> 
                    )}

                    <ul className="navbar-nav mb-2 mb-lg-0">

                        {/* <li className="nav-item ">
                            <a className="nav-link " href="#" id="navbarDropdown" role="button"
                                data-mdb-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faBell} />
                            </a>
                        </li> */}
                        {isCommitteMember && <li className="nav-item fs-5 me-3" title="Add Event">
                            <a className="nav-link" href="/addevent" id="navbarDropdown" role="button">
                                <FontAwesomeIcon icon={faPlus} />
                            </a>
                        </li>}
                        <li className="nav-item dropdown ">
                            <a className="nav-link " href="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown"
                                aria-expanded="false">
                                <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(2).jpg" className="rounded-circle img-fluid"
                                    height='25' width='25' />
                            </a>

                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0 me-3">
                        {user ? (
                            <li className="nav-item" title="Log Out">
                                <span>{user.username}</span>
                                <button className="btn btn-link" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </button>
                            </li>
                        ) : (
                            <li className="nav-item d-flex align-items-center">
                                <div className="d-flex gap-1 align-items-center justify-content-center">
                                    <button className="btn btn-primary btn-sm" onClick={handleRegister}>Register</button>
                                    <button className="btn btn-primary btn-sm" onClick={handleLogin}>Login</button>
                                </div>
                            </li>
                        )}
                    </ul>

                </div>

            </div>
        </nav >
    )
}