import s from './Loader.module.css';

const Loader = () =>{
    
    return (
        <div className={s.divLoaderContainer}>
            <div className={s.divLoaderImage}>
                <img src="/images/loader2.gif" alt="Loading.."/>
            </div>
        </div>     
    )
}

export default Loader;