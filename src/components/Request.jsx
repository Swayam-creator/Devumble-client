const Request = ({connections}) => {
const {firstName ,lastName ,emailId ,skills, projects ,gender, profileImage, about}=connections;
  return (
    <div>
       <div>
           <p>Name : {firstName} + <p></p> +{lastName}</p>
            <p>Email : {emailId}</p>
            <pre>{about}</pre>
       </div>
    </div>
  )
}

export default Request
