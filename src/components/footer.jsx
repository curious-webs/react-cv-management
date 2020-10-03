import React, { Component } from 'react';
class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <footer className="text-white bg-dark-blue footer py-3 text-center">
                    Copyright &#169; {(new Date().getFullYear())}
                </footer>
            </React.Fragment>
         );
    }
}
 
export default Footer;