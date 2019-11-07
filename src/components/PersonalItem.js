import React from 'react'

const PersonalItem = ({ name, comment, links }) => {

    return (
        <p><i className="far fa-snowflake"></i> {name}, {comment}, {links.map(link => {
            if (link.length > 0) {
                return <a href={link} target='_blank' key={link}>Link</a>
            }
        })}</p>
    )
}
  
export default PersonalItem