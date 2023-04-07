import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useCreateMachine, useDeleteMachine } from "~/components/machine";
import Header from "../../../components/header";

const SimulationFrame: React.FC<{ machinePort: number }> = ({
    machinePort,
}) => {
    // TODO: poll if URL is available and only then load the iframe
    return (
        <iframe
            src={`http://${process.env.NEXT_PUBLIC_DOCKER_HOST}:${machinePort}/beware`}
            allowFullScreen={true}
            className="simulation__frame"
        ></iframe>
    );
};

const MachineButtons: React.FC<{ userCourseId: string }> = ({userCourseId}) => {
    const {
        mutate: deleteMachine,
        mutateAsync: deleteMachineAsync,
    } = useDeleteMachine();
    const { mutate: createMachine } = useCreateMachine();

    const handleResetMachine = async () => {
        await deleteMachineAsync({ userCourseId });
        createMachine({ userCourseId });
    }

    return <>
        <button onClick={() => deleteMachine({ userCourseId })}>destroy machine</button>
        <button onClick={() => void handleResetMachine()}>reset machine</button>
    </>;
}

const Simulation = () => {
    const id = useRouter().query.id as string;
    useSession({ required: true });
    const { data: course } = api.course.byId.useQuery({ id });
    const utils = api.useContext();
    const [error, setError] = useState(false);
    const { mutateAsync: checkAnswer, isLoading } =
        api.course.answer.useMutation({
            onSuccess: async (isCorrect) => {
                // refetch the course to get the updated answer
                await utils.course.byId.invalidate({ id });
                if (!isCorrect) {
                    setError(true);
                } else {
                    setError(false);
                }
            },
            onError: () => {
                setError(true);
            },
        });
    const { mutate: createMachine } = useCreateMachine();

    const handleCreateMachine = () => {
        if (!course) return;
        if (!course.user) {
            alert("oops, u have to enroll first");
            return;
        }
        createMachine({ userCourseId: course.user.id });
    };

    if (course == null) {
        return null;
    }

    return (
        <main className="page-course-intro">
            <Header></Header>
            <div className="course-content">
                <h1 className="heading page-course-intro__title">
                    {course?.name}
                </h1>
                <div className="simulation">
                    <div className="simulation__tasks">
                        <h2>Tasks</h2>
                        {course.questions.map((question, index) => (
                            <div
                                className={`question ${
                                    index == course.lastAnsweredQuestionOrder &&
                                    !isLoading
                                        ? "question--active"
                                        : ""
                                }`}
                                key={question.id}
                            >
                                {/* <p className="question__feedback question__feedback--error question__feedback--invisible">
                                    Wrong answer. Please try again.
                                </p> */}
                                <p className="question__text">
                                    {index + 1}. {question.instruction}
                                </p>
                                <form
                                    onSubmit={(e) =>
                                        void (async () => {
                                            e.preventDefault();
                                            // setIsLoading(true);
                                            const data = new FormData(
                                                e.target as HTMLFormElement,
                                            );
                                            const answer = data.get("answer");
                                            if (answer === null) {
                                                return;
                                            }
                                            // console.log(question.id);
                                            await checkAnswer({
                                                questionId: question.id,
                                                answer: answer.toString(),
                                            });
                                            // setIsLoading(false);
                                        })()
                                    }
                                >
                                    {question.answer ? (
                                        <input
                                            type="text"
                                            className={`question__input question__input--success`}
                                            // placeholder={question.answer}
                                            value={question.answer}
                                            readOnly
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            name="answer"
                                            className={`question__input ${
                                                index ==
                                                    course.lastAnsweredQuestionOrder &&
                                                error
                                                    ? "question__input--error"
                                                    : ""
                                            }`}
                                            // placeholder="VBA Bank"
                                        />
                                    )}
                                    <button
                                        className="question__submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading &&
                                        index ==
                                            course.lastAnsweredQuestionOrder
                                            ? "Checking..."
                                            : "Check"}
                                    </button>
                                </form>
                            </div>
                        ))}
                    </div>
                    <div className="simulation__display">
                        {course.user?.machinePort ? (
                            <SimulationFrame
                                machinePort={course.user?.machinePort}
                            />
                        ) : (
                            <button onClick={handleCreateMachine}>
                                create machine
                            </button>
                        )}
                    </div>
                </div>
                <div>
                    {!!course?.user && <MachineButtons userCourseId={course.user.id} />}
                </div>
                {course.lastAnsweredQuestionOrder ===
                    course.questions.length && (
                    <Link
                        href={`/course/${id}/summary`}
                        className="page-course-intro__button btn"
                    >
                        Continue
                    </Link>
                )}
            </div>
        </main>
    );
};

export default Simulation;
