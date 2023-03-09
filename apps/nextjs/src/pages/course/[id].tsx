import Header from "../../components/header";

const CourseDetail = () => {
    return (
        <>
            <main className="page-course-detail">
                <Header></Header>
                <h1 className="heading center-text">Course Title</h1>
                <div className="course-info">
                    <div className="course-info__progress ">
                        <div className="pie">70%</div>
                    </div>

                    {/* <div className="course-info__chart">
                            <span className="course-info__count">70%</span>
                        </div> */}
                    <p className="course-info__description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quibusdam illo distinctio nam esse tempore. Ab magnam
                        neque enim repellendus, iste impedit quis odit, debitis
                        vero dignissimos aperiam animi, vel repudiandae!
                    </p>
                </div>
                {/* <div className="pie">Timeline</div> */}
                <div className="timeline">Timeline</div>
            </main>
        </>
    );
};

export default CourseDetail;
