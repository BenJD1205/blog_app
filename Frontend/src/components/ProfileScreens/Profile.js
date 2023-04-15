import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import "../../Css/Profile.css"
import { Link, useNavigate } from 'react-router-dom';
import Loader from "../GeneralScreens/Loader";
import { AuthContext } from '../../Context/AuthContext';
import { FiArrowLeft } from 'react-icons/fi'

const Profile = () => {
    const { config } = useContext(AuthContext)
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true)

    const editDate = (createdAt) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const d = new Date(createdAt);
        var datestring = d.getDate() + " " + monthNames[d.getMonth()] + " , " + d.getFullYear()
        return datestring
    }

    const navigate = useNavigate()

    useEffect(() => {

        const getUserProfile = async () => {

            setLoading(true)

            try {
                const { data } = await axios.get("/user/profile", config)

                setUser(data.data)

                setLoading(false)
            }
            catch (error) {
                navigate('/')
            }
        }

        getUserProfile()
    }, [setLoading])



    return (
        <>
            {
                loading ? <Loader /> :
                    <div className="Inclusive_profile_page">
                        <Link to={'/'} >
                            <FiArrowLeft />
                        </Link>
                        <div className="profile-top-wrap">

                            <span>
                                Thông tin thành viên
                            </span>

                        </div>
                        <ul>

                            <li>
                                <span>
                                    Tài khoản
                                </span>
                                <div>
                                    {user.username}
                                </div>
                            </li>
                            <li>
                                <span>E-Mail</span>
                                <div>
                                    {user.email}
                                </div>

                            </li>
                            <li>

                                <span>Ngày tạo </span>
                                <div>
                                    {editDate(user.createdAt)}
                                </div>
                            </li>

                        </ul>

                        <div className='btns_wrap'>
                            <button className='profileEditBtn'>
                                <Link to="/edit_profile">
                                    Sửa thông tin
                                </Link>
                            </button>
                            <button className='changePassBtn'>
                                <Link to="/change_password">
                                    Thay đổi mật khẩu
                                </Link>
                            </button>
                        </div>
                    </div>
            }

        </>

    )
}

export default Profile;
