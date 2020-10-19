import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import styles from "./Homepage.module.css";

import { CsvBuilder } from "filefy";

import { getUsers } from "../../api";

const tableIcons = {
    Add: AddBox,
    Check: Check,
    Clear: Clear,
    Delete: DeleteOutline,
    DetailPanel: ChevronRight,
    Edit: Edit,
    Export: SaveAlt,
    Filter: FilterList,
    FirstPage: FirstPage,
    LastPage: LastPage,
    NextPage: ChevronRight,
    PreviousPage: ChevronLeft,
    ResetSearch: Clear,
    Search: Search,
    SortArrow: ArrowUpward,
    ThirdStateCheck: Remove,
    ViewColumn: ViewColumn
};

const Homepage = () => {
    const topCountries = [
        { country: "United States of America" },
        { country: "Norway" },
        { country: "Iceland" }
    ]

    const defaultProps = {
        options: topCountries,
        getOptionLabel: (option) => option.title,
      };

    const [users, setUsers] = useState('');
    const [query, setQuery] = useState(false);
    const [value, setValue] = React.useState(null);

    useEffect(() => {
        if (users) { updateComponent(); };
    }, [users]);

    useEffect(() => {
        console.log("mounting homepage.")
        return () => {
            setUsers(null);
            setQuery(false);
            console.log("unmounting homepage.");
        }
    }, []);

    const executeQuery = async () => {
        setQuery(true);
        let newUsers = await getUsers(value)
        setUsers(newUsers);
    }

    const updateComponent = () => {
        console.log("query returned");
        setQuery(false);
    }

    const parseColumns = (items) => {
        let modKeys = []
        let modData = {}
        items.forEach(function (item) {
            modData = {
                title: item,
                field: item,
            }
            modKeys.push(modData);
        })

        return modKeys;
    }

    const materialActions = [
        {
            position: "toolbarOnSelect",
            icon: SaveAlt,
            tooltip: "Export the Selected Rows",
            onClick: (e, rowData) => {
                const fileName = `Users: ${users.length}`;
                const builder = new CsvBuilder(
                    fileName + ".csv"
                );
                const columns = parseColumns(Object.keys(rowData[0]))
                    .filter(
                        (columnDef) =>
                            (!columnDef.hidden || columnDef.export === true) &&
                            columnDef.export !== false &&
                            columnDef.title !== "tableData" &&
                            columnDef.field
                    );
                builder
                    .setColumns(
                        columns.map(
                            (columnDef) => columnDef.title
                        )
                    )
                    .addRows(
                        rowData.map((rowData) =>
                            columns.map(
                                (columnDef) =>
                                    rowData[columnDef.field]
                            )
                        )
                    )
                    .exportFile();
            },
        },
    ]

    const tableStyles = {
        width: '100%',
    }

    const Complete = () => {

        if (users) {
            return (
                <div className={`container my-2`}>
                    <div className={`row justify-content-around`}>
                        <MaterialTable
                            icons={tableIcons}
                            style={tableStyles}
                            columns={parseColumns(Object.keys(users[0]))}
                            data={users}
                            title={`Users: ${users.length}`}
                            actions={materialActions}
                            options={{
                                filtering: true,
                                exportButton: {
                                    csv: true,
                                },
                                selection: true
                            }}
                        />
                    </div>
                </div>
            )
        }
    }

    const Loading = () => {

        if (query) {
            return (
                <div className={`container my-2`}>
                    <div className={`row my-5 justify-content-around`}>
                        <BeatLoader
                            color={"green"}
                        />
                    </div>
                </div>
            )
        }
    };

    // const handleQueryUpdate = (event) => {
    //     setQueryInput(event.target.value);
    // }

    const Entry = () => {

        return (
            <div className="container my-2">
                <div className={`row mx-3 justify-content-around ${styles.div}`}>
                    <h1> Execute MongoDB Query </h1>
                </div>
                <div className={`container`}>
                    <div className={`row justify-content-around`}>
                        <form>
                            <div className="form-group">
                                {/* <label for="combo-box-countries">Country Name</label> */}
                                <Autocomplete
                                    {...defaultProps}
                                    id="combo-box-countries"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    options={topCountries}
                                    getOptionLabel = {(option) => option.country}
                                    getOptionSelected={(option, value) => option.country === value.country}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Country Name" variant="outlined" />}
                                />
                            </div>
                            <button onClick={executeQuery} className={`btn btn-success ${styles.btn}`}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    };

    return (
        query ? Loading() : (users ? Complete() : Entry())
    )
}

export default Homepage;