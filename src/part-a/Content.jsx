import Part from "./Part";

function Content({content}) {
    

    return(
        <>
            <ul>
                {content.map(part => <Part key={part.id} part={part}/>)}
            </ul>
        </>
    )
}

export default Content;