// export default function Footer(){
//     return (
//         <footer className="bg-blue-900 text-white py-6">
//             <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
//                 <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
//                 <ul className="flex space-x-6 mt-4 md:mt-0">
//                     <li>
//                         <a href="#" className="hover:underline">Privacy Policy</a>
//                     </li>
//                     <li>
//                         <a href="#" className="hover:underline">Terms of Service</a>
//                     </li>
//                     <li>
//                         <a href="#" className="hover:underline">Contact</a>
//                     </li>
//                 </ul>
//             </div>
//         </footer>
//     )
// }

export default function Footer(){
    return (
        <footer className="bg-blue-900 text-white py-6 mt-auto">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                <ul className="flex space-x-6 mt-4 md:mt-0">
                    <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                    <li><a href="#" className="hover:underline">Terms of Service</a></li>
                    <li><a href="#" className="hover:underline">Contact</a></li>
                </ul>
            </div>
        </footer>
    )
}
