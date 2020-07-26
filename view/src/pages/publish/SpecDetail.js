import React, { useState, useEffect } from "react";
import SchemaForm from 'react-schema-form/lib/SchemaForm';
import RcSelect from "react-schema-form-rc-select";
import utils from 'react-schema-form/lib/utils';
import Button from '@material-ui/core/Button';
import forms from '../../data/Forms';
import { useSiteState, useSiteDispatch } from "../../context/SiteContext";

export default function SpecDetail(props) {
    const { step, classes, specUpload } = props;
    const [model, setModel] = useState({...useSiteState().specDetail});
    const [showErrors, setShowErrors]  = useState(false);
    const [specDetail, setSpecDetail] = useState();
    const mapper = {
        "rc-select": RcSelect
    };

    let siteDispatch = useSiteDispatch();
  
    useEffect(() => {
      siteDispatch({ type: "UPDATE_SPECDETAIL", specDetail: specDetail }); 
    }, [specDetail]);
  
    if(step !== 1) {
      return null;
    }
  

    let formData = forms['specDetailForm'];
    var buttons = [];
  
    const onModelChange = (key, val, type) => {
      utils.selectOrSet(key, model, val, type);
      setModel({...model});  // here we must create a new object to force re-render.
    };
  
    const onButtonClick = (item) => {
      console.log(item);
      if(item.action === 'upload') {
        let validationResult = utils.validateBySchema(formData.schema, model);
        console.log(validationResult);
        if(!validationResult.valid) {
            setShowErrors(true);
        } else {
          setSpecDetail(model)
          specUpload();
        }   
      }
    }
    
    formData.actions.map((item, index) => {
        buttons.push(<Button variant="contained" className={classes.button} color="primary" key={index} onClick={e => onButtonClick(item)}>{item.title}</Button>)
        return buttons;
    });

    let title = <h2>{formData.schema.title}</h2>
  
    return (
      <div>
        {title}    
        <SchemaForm schema={formData.schema} form={formData.form} model={model} mapper={mapper} showErrors={showErrors} onModelChange={onModelChange} />
        {buttons}
      </div>
    )  
  }
  