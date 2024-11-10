import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import AceEditor from "react-ace";
import YAML from 'yaml';
import CircularProgress from '@mui/material/CircularProgress';
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import FileUpload from "../../components/Upload/FileUpload";
import { useUserState } from "../../contexts/UserContext";

export default function OpenapiEditor(props) {
    const serviceId = props.location.state.data.serviceId;
    const serviceName = props.location.state.data.name;
    const style = props.location.state.data.style;
    const [spec, setSpec] = useState('');
    const [loading, setLoading] = useState(true);

    const { host } = useUserState();
    const cmd = {
        host: 'lightapi.net',
        service: 'market',
        action: 'getServiceById',
        version: '0.1.0',
        data: { serviceId, host }
    }

    const url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(cmd));

    const queryServiceFn = async (url, headers) => {
        try {
            setLoading(true);
            const response = await fetch(url, { headers, credentials: 'include' });
            if (!response.ok) {
                const error = await response.json();
            } else {
                const data = await response.json();
                console.log(data);
                if(data.hasOwnProperty('spec')) {
                    setSpec(data.spec);
                }
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    useEffect(() => {
        const cookies = new Cookies();
        const headers = { 'X-CSRF-TOKEN': cookies.get('csrf') };
        queryServiceFn(url, headers);
    }, []);

    const onChange = (spec) => {
        setSpec(spec);
    };

    const onUpload = (files) => {
        files.forEach(file => {
            var reader = new FileReader();
            reader.onload = function (e) {
                setSpec(e.target.result);
            };
            reader.readAsText(file);
        })
    };

    const submitSpec = () => {
        // console.log("submitSpec is called");
        props.history.push({
            pathname: '/app/submitSpec',
            state: { serviceId, style, spec },
        });
    };

    let wait;
    if (loading) {
        wait = <div><CircularProgress /></div>;
    } else {
        console.log(spec);
        wait = (
            <div>
                {serviceId} - {serviceName}
                <Button variant="contained" color="primary" onClick={submitSpec}>
                    SUBMIT
                </Button>
                <FileUpload
                    accept=".yaml,.yml"
                    label="OpenAPI specification file in YAML"
                    multiple={false}
                    updateFilesCb={onUpload}
                />
                <AceEditor
                    mode="yaml"
                    theme="github"
                    value={spec}
                    onChange={onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                />
                <SwaggerUI
                    spec={spec.length > 0 ? YAML.parse(spec) : ''}
                />
            </div>
        )
    }

    return (
        <div className="App">
            {wait}
        </div>
    );
}
