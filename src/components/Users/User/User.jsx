import React, { useEffect } from "react";
import s from "./User.module.css";
import man from "../../Profile/ProfileInfo/images/man.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowedUsers,
  getFollowingInProgress,
} from "../../../redux/usersSelector";
import { follow, unfollow } from "../../../redux/usersReducer";
import { getIsAuth } from "../../../redux/authSelector";

const User = ({ users, ...props }) => {
  const followedUsers = useSelector(getFollowedUsers);
  const followingInProgress = useSelector(getFollowingInProgress);
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(followedUsers);
  }, [followedUsers]);

  return (
    <>
      <div className={s.user}>
        <NavLink to={"/profile/" + users.id} className={s.link}>
          <div className={s.userAvatar}>
            {users?.photos.small ? (
              <img src={users.photos.small} alt="userAvatar" />
            ) : (
              <img src={man} alt="userAvatar" />
            )}
          </div>
          <div className={s.userName}>{users.name}</div>
        </NavLink>
        <div className={s.follow}>
          {users.followed ? (
            <button
              disabled={
                !isAuth || followingInProgress.some((id) => id === users.id)
                // followedUsers.includes(users.id)
              }
              onClick={() => {
                dispatch(unfollow(users.id));
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={
                !isAuth || followingInProgress.some((id) => id === users.id)
                // followedUsers.includes(users.id)
              }
              onClick={() => {
                dispatch(follow(users.id));
              }}
            >
              Follow
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
