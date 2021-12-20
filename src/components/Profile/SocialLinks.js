const SocialLinks = (props) => {
     
    return (
        <ul className="ftco-social mt-3">
            {Object.keys(props.social).map( item => {
                if (props.social[item]!=="" && props.social[item]!==undefined && props.social[item]!==null){
                    return <li className="ftco" key={item}><a href={props.social[item]}><span className={`icon-${item}`}></span></a></li>

                }
                return null
                

            })}
        </ul>
    );
}

export default SocialLinks;