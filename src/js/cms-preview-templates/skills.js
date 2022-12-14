import React from "react";

const Skill = ({ name, description, level }) => {
    return (
        <div className="flex-m mhn3-m mb4">
            <div className="ph3-m w-50-m">
                <h3 className="f3 b lh-title mb1">{name}</h3>
                <p>{description}</p>
            </div>
            <div>{level}</div>
        </div>
    );
};

export default class SkillsPreview extends React.Component {
    render() {
        const { entry } = this.props;

        const entryValues = entry.getIn(["data", "values"]);
        const values = entryValues ? entryValues.toJS() : [];

        return (
            <div>
                <div className="bg-off-white pv4">
                    <div className="mw7 center ph3 pt4">
                        {values.map(({ name, description, level }) => (
                            <Skill
                                key={i}
                                description={description}
                                name={name}
                                level={level}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
