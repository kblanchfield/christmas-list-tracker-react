import React from 'react'
import './Lists.css'

const PersonalItem = ({ name, comment, links }) => {

    console.log("OthersItPersonalItemem: ", name, comment, links)

    return (
        <p><i className="far fa-snowflake"></i>
            {name}
            <span className="item-comment"> - {comment}</span>, 
            {links.map(link => {
                if (link.length > 0) {
                    return <a href={link} target='_blank' rel="noopener noreferrer" key={link}> Link</a>
                } else {
                    return ''
                }
            })}
        </p>
    )
}
  
export default PersonalItem