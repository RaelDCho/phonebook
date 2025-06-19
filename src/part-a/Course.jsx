import Content from "./Content";

function Course({course}) {

    return(
        <>
            <h1>{course.name}</h1>
            <Content content={course.parts} />
        </>
    )
}

export default Course;