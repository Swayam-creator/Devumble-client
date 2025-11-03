const Request = ({conn}) => {
const [{firstName ,lastName ,emailId ,skills, projects ,gender, profileImage, about ,_id}]=conn;
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