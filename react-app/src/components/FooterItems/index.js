import { useHistory } from 'react-router-dom';
import './index.css';

function Footer(){
    const history = useHistory();

    
    return(
        <div className="Footer-container">
            <div className='footer-column'>
                {`United States | English | $ (Berry)`}
            </div>
            <div className='footer-column'>

            </div>
            <div className='footer-column'>
                <div>
                    2023 Besty, inc.
                </div>
                <a href='https://github.com/Remiadekunle' target="_blank">
                    <button className='github-button'>Visit Developer's Github</button>
                </a>
            </div>
        </div>
    )
}
export function Footer2(){
    const history = useHistory();

    const toGit = () => {
        return history.push('/')
    }
    return(
        <div className="Footer-container2">
            <div className='footer-column'>
                {`United States | English | $ (Berry)`}
            </div>
            <div className='footer-column'>

            </div>
            <div className='footer-column'>
                <div>
                    2023 Besty, inc.
                </div>
                <a href='https://github.com/Remiadekunle' target="_blank">
                    <button className='github-button'>Visit Developer's Github</button>
                </a>
            </div>
        </div>
    )
}

export default Footer
