const SocialLinks = (props) => {
     
    return (
        <ul className="ftco-social mt-3">
            {Object.keys(props.social).map( item => {
                if (props.social[item]!="" && props.social[item]!=undefined){
                    return <li className="ftco" key={item}><a href={props.social[item]}><span className={`icon-${item}`}></span></a></li>

                }
                

            })}
        </ul>
    );
}

export default SocialLinks;