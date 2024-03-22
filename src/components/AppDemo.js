import React from 'react';
import FullImg from '../assets/tracker.png';
import TableImg from '../assets/table.png';
import EditFeat from '../assets/edit_form.png';
import DeleteFeat from '../assets/delete_form.png';


function AppDemo() {
    return(
        <section className="collage animate__animated grid grid-cols-2 items-center bg-indigo-400 p-4 rounded-lg">
            <figure className="animate__animated animate__slideInDown"><img src={DeleteFeat} className='object-cover max-w-md w-full' alt="delete feat" /></figure>
            <figure className="animate__animated animate__zoomInRight"><img src={FullImg} className='object-cover max-w-md w-full' alt="form pic" /></figure>
            <figure className="animate__animated animate__zoomInLeft"><img src={TableImg} className='object-cover max-w-md w-full' alt="table pic" /></figure>
            <figure className="animate__animated animate__slideInUp"><img src={EditFeat} className='object-cover max-w-md w-full' alt="edit feat" /></figure>
        </section>
    )
}

export default AppDemo;