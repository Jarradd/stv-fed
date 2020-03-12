import React from 'react';
import './addProgramme.css'

class AddProgramme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            shortDescription: '',
            active: null
        };
    };

    handleAddProgramme = event => {
        let value = event.target.value;
        this.setState({
            [event.target.id]: value,
            [event.target.name]: value,
            [event.target.shortDescription]: value,
            [event.target.active]: value
        });
    };

    addProgramme = () => {

        let id = this.state.id;
        let name = this.state.name;
        let shortDescription = this.state.shortDescription;
        const active = JSON.parse(this.state.active);

        const players = this.props.data;
        players.unshift({
            id: id,
            name: name,
            shortDescription: shortDescription,
            active: active
        });
        localStorage.setItem('availableProgrammes', JSON.stringify(players));
        this.props.handleSetData(players);
    };

    render() {
        return (
            <div className='addNewProgrammes'>
                <input
                    type="number"
                    id="id"
                    value={this.state.id}
                    onChange={this.handleAddProgramme}
                    placeholder="Programme ID"
                />
                <input
                    type="text"
                    id="name"
                    value={this.state.name}
                    onChange={this.handleAddProgramme}
                    placeholder="Programme Name"
                />
                <input
                    type="text"
                    id="shortDescription"
                    value={this.state.shortDescription}
                    onChange={this.handleAddProgramme}
                    placeholder="Programme Description"

                />
                <select
                    id="active"
                    value={this.state.active}
                    onChange={this.handleAddProgramme}>
                    <option value="null">Please Select Programme Status</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                <button
                    className="programmesAdd"
                    onClick={this.addProgramme}>
                    Add Program
                </button>
            </div>
        );
    }
}
export default AddProgramme;
