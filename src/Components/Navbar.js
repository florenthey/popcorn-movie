import React from 'react';

const Navbar = () => {

    return(
       <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-primary">
       <a className="navbar-brand" href="#">Accueil</a>
       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button>
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav mr-auto">
         <li className="nav-item active">
             <a className="nav-link" href="#">Récents<span className="sr-only">(current)</span></a>
           </li>
           <li className="nav-item active">
             <a className="nav-link" href="#">Séries<span className="sr-only">(current)</span></a>
           </li>
           <li className="nav-item active">
             <a className="nav-link" href="#">Films<span className="sr-only">(current)</span></a>
           </li>
           <li className="nav-item active">
             <a className="nav-link" href="#">Animés<span className="sr-only">(current)</span></a>
           </li>
           <li className="nav-item active">
             <a className="nav-link" href="#">Nos offres<span className="sr-only">(current)</span></a>
           </li>
         </ul>
       </div>
     </nav>
      </div>
    )
}

export default Navbar;