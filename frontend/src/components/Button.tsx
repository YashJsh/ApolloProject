import React from 'react'

const Button = ({title} : {title : string}) => {
  return (
    <button className="font-semibold text-md hover:border-b-2 hover:text-[#165D59]">{title}</button>
  )
}

export default Button
