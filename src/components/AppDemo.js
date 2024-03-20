import React from 'react';
import FullImg from '../assets/tracker.png';
import TableImg from '../assets/table.png';
import EditFeat from '../assets/edit_form.png';
import DeleteFeat from '../assets/delete_form.png';


function AppDemo() {
    return(
        <section className="collage grid grid-cols-2 items-center bg-indigo-400 p-4 rounded-lg">
            <figure><img src={DeleteFeat} className='object-cover max-w-md w-full' alt="delete feat" /></figure>
            <figure><img src={FullImg} className='object-cover max-w-md w-full' alt="form pic" /></figure>
            <figure><img src={TableImg} className='object-cover max-w-md w-full' alt="table pic" /></figure>
            <figure><img src={EditFeat} className='object-cover max-w-md w-full' alt="edit feat" /></figure>
        </section>
    )
}

export default AppDemo;