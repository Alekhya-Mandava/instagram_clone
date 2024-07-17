import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUserAction, unFollowUserAction,getUserProfileAction } from "../../Redux/User/Action";


const SuggestionsUserCard = ({ image, username, description, userId }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.reqUser);
  const [isFollowing, setIsFollowing] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) {
      dispatch(getUserProfileAction(token));
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    if (user) {
      setIsFollowing(user.following?.includes(userId));
    }
  }, [user, userId]);

  const handleFollowToggle = () => {
    const data = { jwt: token, userId: userId };
    dispatch(isFollowing ? unFollowUserAction(data) : followUserAction(data));
    setIsFollowing(!isFollowing);
  };

  
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center'>
        <img className='w-9 h-9 rounded-full' src={image} alt="" />
        <div className='ml-2'>
          <p className='text-sm font-semibold'>{username}</p>
          <p className='text-sm font-semibold opacity-70'>{description}</p>
        </div>
      </div>
      <button 
        onClick={handleFollowToggle}
        className={`text-sm font-semibold ${isFollowing ? 'text-gray-700' : 'text-blue-700'}`}
      >
        {isFollowing ? 'unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default SuggestionsUserCard;

