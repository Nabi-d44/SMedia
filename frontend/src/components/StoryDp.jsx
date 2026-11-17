// import React from 'react'
// import profileImage from "../assets/profileImage.jpg"

// const StoryDp = ({ProfileImage,userName}) => {

//   return (
//     <div className='w-20 h-20 bg-linear-to-b from-blue-500 to-blue-950 rounded-full flex justify-center items-center'>
//         <div className='w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-700'>
//           <img
//             src={ profileImage}
//             className='w-full h-full object-cover'
//             alt="Profile"
//           />
//         </div>
//     </div>
//   )
// }

// export default StoryDp

import React from 'react'
import profileImage from "../assets/profileImage.jpg"

const StoryDp = ({ ProfileImage, userName }) => {

  return (
    <div className='flex flex-col items-center gap-1 cursor-pointer'>

      {/* Instagram Story Gradient */}
      <div className='w-20 h-20 rounded-full p-0.75 bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 flex justify-center items-center'>

        {/* Profile Image */}
        <div className='w-full h-full rounded-full p-0.75 bg-black overflow-hidden'>
          <img
            src={ profileImage}
            className='w-full h-full rounded-full object-cover'
            alt="Profile"
          />
        </div>

      </div>
      <span className='text-white text-xs w-20 text-center truncate'>
        {userName}
      </span>

    </div>
  )
}

export default StoryDp