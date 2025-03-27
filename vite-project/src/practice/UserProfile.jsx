const { userContextChange } = require("./userContext")

function Userprofile()
{
    const [user,setUser] = useContext(userContextChange);
    return(
        <div>
            <h1>user : {user}</h1>
            <button onChange={() => setUser("jalaripalli")}>change name</button>
        </div>
    )
}
export default Userprofile;