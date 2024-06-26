import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box,CardMedia, MenuItem, Select, InputLabel} from '@mui/material';
import { useEffect,useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {FaCaretDown} from 'react-icons/fa'



import {logout} from 'src/redux/actions/auth.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import {  uploadImage, uploadProfileImage,updateProfile} from 'src/redux/actions/auth.action';

import DEFAULTIMG from '../assets/images/rec.png';


function ProfilePage() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { user,error,registeredWithSocials } = useSelector((state) => state.auth);


  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [file, setFile] = useState();
  
 const [state, setState] = useState({
    paymentLink: user?.paymentLink ? user?.paymentLink : "",
    password: "",
    imageUrl: user?.imageUrl ? user?.imageUrl : "",
  })


  /*SETTING UP GOOGLE TAG MANAGER--*/
  window.dataLayer = window.dataLayer || [];
 function gtag(){window.dataLayer.push(arguments);}
 gtag('js', new Date());

 gtag('config', 'G-EY9BN9TW8S',{ 'debug_mode': true });
/*SETTING UP GOOGLE TAG MANAGER-- END */




  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(URL.createObjectURL(event.target.files[0]));
};


const settingsUpdate = () => {

  setLoading(true);
 
  const imageUrl = user && user.imageUrl?user.imageUrl:" ";

  //console.log("TELEPHONE COUNTRY CODE-->",telephone.substring(0,3))

  if(telephone.substring(0,3) !== '224'){

    notifyErrorFxn("assurez-vous que le numéro de téléphone commence par 224")
    return
  }else{
  if(selectedFile.selectedFile.length === 0){
   
    dispatch(updateProfile(updateObject, user.uid, '', navigate, setLoading, imageUrl));

    gtag("event", "profile-survey", {
      "user-id":user && user.uid?user.uid:"no uid found",
      email:user && user.email?user.email:"no email found",
      fullName:updateObject && updateObject.fullName,
      classOption:updateObject && updateObject.classes,
      telephone: (updateObject.telephone.toString().length > 3?updateObject.telephone :'none') ,
      affiliateId:updateObject &&updateObject.affiliate?updateObject.affiliate:"none",
      "survey-answer": updateObject &&updateObject.surveyAnswer?updateObject.surveyAnswer:"none",
   });


  }else{
    dispatch(uploadProfileImage(updateObject, selectedFile.selectedFile, user.uid, navigate, setLoading));

    gtag("event", "profile-survey", {
      "user-id":user && user.uid?user.uid:"no uid found",
      email:user && user.email?user.email:"no email found",
      fullName:updateObject && updateObject.fullName,
      classOption:updateObject && updateObject.classes,
      telephone: (updateObject.telephone.toString().length > 3?updateObject.telephone :'none') ,
      affiliateId:updateObject &&updateObject.affiliate?updateObject.affiliate:"none",
      "survey-answer": updateObject &&updateObject.surveyAnswer?updateObject.surveyAnswer:"none",
   });


  }
 
}
 
}
 




useEffect(()=>{
   if(!user){
    navigate('/login')
   }

   
  
},[])


const [telephone,setTelephone] = useState(user && user.telephone?user.telephone:(user && user.phone?user.phone:"224"))
const [pvExamen,setPvExamen] = useState(user && user.pvExamen?user.pvExamen:"")
const [classes,setClasses] = useState(user && user.classOption?user.classOption:"")
const [school,setSchool] = useState(user && user.schoolOrigin?user.schoolOrigin:"")
const [firstName,setFirstName] = useState(user && user.firstName?user.firstName:"")
const [lastName,setLastName] = useState(user && user.lastName?user.lastName:"")
const [fullName,setFullName] = useState(user && user.fullName?user.fullName:"")
const [facebook,setFacebook] = useState(user && user.facebook?user.facebook:"")
const [affiliate,setAffiliate] = useState(user && user.affiliate?user.affiliate:"")
const [surveyAnswer,setSurveyAnswer] = useState(user && user.surveyAnswer?user.surveyAnswer:"")

const updateObject = {
  telephone,
  pvExamen,
  classes,
  school,
  fullName,
  facebook,
  affiliate,
  surveyAnswer
}




  return (
    <>
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 

    

    <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"40px"}}>
   
     <br/> 
     <h1>Bienvenue,</h1>
    { 
    user && user.firstName && !user.fullName && user.firstName.length > 0 && user.lastName  && !user.fullName && user.lastName.length > 0 &&  <p style={{color:"gray"}}>{user.firstName + " " + user.lastName }</p>
    
  }
    
    {user && user.fullName && user.fullName.length > 0 &&  <p style={{color:"gray"}}>{user.fullName }</p>}
  
   { registeredWithSocials &&
     <>
     <br/> 
     <h1 style={{color:"red"}}>Veuillez inclure le reste de vos données maintenant</h1>

     </>
    }
    </Grid>

  



  

      <Grid container item xs={12} spacing={2} style={{ display: 'flex',flexDirection:"column" ,justifyContent: 'center',marginTop:"10px",marginBottom:"40px" }}>
         
      <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
           
          
       <p style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center" ,width:"95%"}}>  <span>MON PROFIL</span> <FaCaretDown/></p>
       <Divider variant="fullWidth" sx={{backgroundColor:"#000000",width:"100%"}}  />
        
       <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
          <CardMedia
            style={{ border: '0.2px solid black', backgroundColor: '#fff', width: '200px' }}
            component="img"
            height="200"
            width="300"
            image={file ? file : state.imageUrl !== "" ? state.imageUrl : DEFAULTIMG}
            alt="IMG"
          />
          <Button component="label" variant="contained" style={{ minHeight: '45px', minWidth: '145px', backgroundColor: '#000000', marginTop: '15px' }}>
            <b>TÉLÉCHARGER</b>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleselectedFile}
            />
          </Button>
        </div>



        </Grid>


      

        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=""
        variant="outlined"
        multiline
        maxRows={2}
        value={fullName?fullName:firstName + " " + lastName}
        onChange = {(e)=>{setFullName(e.target.value)}}
        label= "NOM COMPLET"
        />
        </Grid>


       {/* <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=""
        variant="outlined"
        multiline
        maxRows={2}
        value={lastName}
        onChange = {(e)=>{setLastName(e.target.value)}}
        label= "NOM DE FAMILLE"
        />
        </Grid> */}


        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=""
        variant="outlined"
        multiline
        maxRows={2}
        value={user && user.email.length > 0 &&user.email}
        disabled={true}
        //onChange = {(e)=>{setConfirmPassword(e.target.value)}}
        label= "EMAIL"
        />
        </Grid>

        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        {<Select
          style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
         inputProps={{
          classes: {
              icon: classes.icon,
          },
      }}
        
          labelId="hi-label"
          id="hi"
          value={classes}
          label="Classe et option"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Classe et option</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setClasses(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>Classe et Option</MenuItem>   
  <MenuItem  value={"6eme Annee"}>6eme Annee</MenuItem>
  <MenuItem   value={"10eme Annee"}>10eme Annee</MenuItem>
  <MenuItem   value={"Terminales"}>Terminales</MenuItem>

       
        </Select>}
        </Grid>



        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",marginBottom:"3rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        value={telephone}
        onChange = {(e)=>{setTelephone(e.target.value)}}
        label= "Numero de Telephone"
        />
        </Grid>


        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <p>(facultatif)</p>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        value={facebook}
        onChange = {(e)=>{setFacebook(e.target.value)}}
        label= "Facebook"
        />
        </Grid>


        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        value={school}
        onChange = {(e)=>{setSchool(e.target.value)}}
        label= "Ecole d'origine"
        />
        </Grid>


        


        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        value={affiliate}
        onChange = {(e)=>{setAffiliate(e.target.value)}}
        label= "Identifiant Affilié"
        />
        </Grid>

        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        value={pvExamen}
        onChange = {(e)=>{setPvExamen(e.target.value)}}
        label= "PV examen"
        />
        </Grid>

        


        <Grid item xs={12} spacing={2} style={{marginTop:"4rem",marginBottom:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <p style={{width:"100%"}} id="hi-label">Comment avez vous découvert Bonecole la première fois ?</p>
        {<Select
          style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
         inputProps={{
          classes: {
              icon: classes.icon,
          },
      }}
        
          labelId="hi-label"
          id="hi"
          value={surveyAnswer}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Comment avez vous découvert Bonecole la première fois ?</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setSurveyAnswer(event.target.value);
          }}
        >
       
    <MenuItem disabled value="">Comment avez vous découvert Bonecole la première fois ?</MenuItem> 
  <MenuItem  value={"Facebook"}>Facebook</MenuItem>
  <MenuItem   value={"Visite de Bonecole dans mon école"}>Visite de Bonecole dans mon école</MenuItem>
  <MenuItem   value={"Télé / Radio"}>Télé / Radio</MenuItem>
  <MenuItem   value={"Affilié Bonecole"}>Affilié Bonecole</MenuItem>
  <MenuItem   value={"À travers une connaissance"}>À travers une connaissance</MenuItem>
  <MenuItem   value={"Autres (veuillez préciser)"}>Autres (veuillez préciser)</MenuItem>


       
        </Select>}
        </Grid>

       {/* WE WILL USE THESE TWO GRID ITEMS BELOW FOR UPDATING PASSWORD, BUT LATER

        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        //onChange = {(e)=>{setConfirmPassword(e.target.value)}}
        label= "PV examen"
        />
        </Grid>

        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        //onChange = {(e)=>{setConfirmPassword(e.target.value)}}
        label= "Numero de Telephone"
        />
        </Grid>

  */}
        

       

      

     
      <>
        <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
           <Button   variant="contained" 
          style={{ backgroundColor: "#f00c44",color:"#FFFFFF",width:"100%",height:"3rem",fontSize:"12px",
          }}
          onClick ={()=>{settingsUpdate()}}
          >
          Sauvegarder changement
          </Button>
       
        </Grid>
       


    
          <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
             <Button   variant="contained" 
            style={{ backgroundColor: "gray",color:"#FFFFFF",width:"100%",height:"3rem",fontSize:"12px",
            }}
            onClick ={()=>{navigate(-1)}}
            >
            Annuler
            </Button>
         
          
            <br/><br/><br/>
  
          </Grid>

          </>

          
        </Grid>

    
        
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center',alignItems:"center", flexDirection:"column",paddingTop:"1rem",paddingBottom:"40px"}}>
    <Button   variant="contained" 
            style={{ backgroundColor: "transparent",color:"#000000",width:"50%",height:"2.5rem",fontSize:"12px",
            }}
            onClick ={()=>{dispatch(logout(navigate))}}
            >
            Se déconnecter
            </Button>
   
    </Grid>
    

</Container>
    </>
  );
}

export default ProfilePage;