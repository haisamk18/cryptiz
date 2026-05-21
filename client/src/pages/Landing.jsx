import { useNavigate } from "react-router-dom";

export default function Landing(){

const navigate=useNavigate()

return(

<div className="min-h-screen flex items-center justify-center">

<div className="text-center">

<h1 className="text-6xl font-bold mb-5">

Cryptiz
</h1>

<p className="text-gray-400 mb-8">

AI-powered crypto wallet risk scanner
</p>

<button
onClick={()=>navigate("/dashboard")}
className="bg-blue-600 px-6 py-3 rounded-lg"
>

Launch App

</button>

</div>

</div>

)

}