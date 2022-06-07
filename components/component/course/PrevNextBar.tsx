import {Course, CourseStepType, getLink} from "../../../src/Model";
import Link from "../../../src/Link";

type PrevNextBarProps = {
    stepKey: string,
    stepType: CourseStepType,
    course: Course,
    changeState?: {
        text: string,
        action: () => void,
    },
};

export function PrevNextBar({course, stepKey, stepType, changeState}: PrevNextBarProps) {
    const interestingSteps = course.steps.filter(step => step.type !== "LINK")
    const position = interestingSteps.findIndex((step) => step.key === stepKey && step.type === stepType)

    if (position === -1) return <></>

    const prevLink = position !== 0 ? getLink(course.key, interestingSteps[position - 1]) : null
    const nextLink = position < interestingSteps.length - 1 ? getLink(course.key, interestingSteps[position + 1]) : null

    return <div style={{display: "flex", margin: "10px"}}>
        {prevLink &&
        <div style={{flex: 1, flexGrow: 0}}>
            <Link to={prevLink} className="button button pointer" style={{width: "150px"}}>
                Previous
            </Link>
        </div>
        }
        {changeState &&
        <div style={{flex: 1, textAlign: "right", flexGrow: 1}}>
            <div onClick={changeState.action} className="button button pointer" style={{width: "200px"}}>
                {changeState.text}
            </div>
        </div>
        }
        {nextLink &&
        <div style={{flex: 1, textAlign: "right", flexGrow: changeState ? 0 : 1, marginLeft: "20px"}}>
            <Link to={nextLink} className="button button pointer" style={{width: "150px"}}>
                Next
            </Link>
        </div>
        }
    </div>;
}