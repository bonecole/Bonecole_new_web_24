import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box, InputLabel} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Select from '@mui/material/Select';

import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import bonLogo from 'src/assets/images/bonlogo.png'
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';
import Alert from '@mui/material/Alert';



import { signup} from 'src/redux/actions/auth.action';
import { logoutSuccess} from 'src/redux/reducers/auth.slice';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';


import {FaCaretDown} from 'react-icons/fa'
import { MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '4rem',
    paddingRight: '4rem',
    color:"black"
  },
  searchInput: {
    background: '#FFFFFF',
   
    border: '1px solid #00000026',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    // marginRight: theme.spacing(2),
    width: '100%',
    minWidth: '100%',
    '& .MuiInputBase-input': {
      color: 'grey',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'grey',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'grey',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'grey',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'grey',
    },
  },

  select: {
    '&:before': {
        borderColor: "black",
    },
    '&:after': {
        borderColor: "black",
    }
  },
  icon: {
    fill: "black",
}



}));



function MobileRegisterPage() {

  const classes = useStyles()

  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [fileSize, setFileSize] = useState();
  const [fileSize2, setFileSize2] = useState();
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [selectedFile2, setSelectedFile2] = useState({selectedFile2: [], selectedFileName2: []});
  const dispatch = useDispatch();


  
  const [email,setEmail] = useState('')
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [password,setPassword] = useState('')
 
  const [facebook,setFacebook] = useState('')
  const [affiliate,setAffiliate] = useState('')
 const [pvExamen,setPvExamen] = useState('')
 const [classOption,setClassOption] = useState('')
 const [telephone,setTelephone] = useState('224')
 const [schoolOrigin,setSchoolOrigin] = useState('')


  const [page2,setPage2] = useState(false)
  const [page1,setPage1] = useState(true)

/*SETTING UP GOOGLE TAG MANAGER--*/
  window.dataLayer = window.dataLayer || [];
 function gtag(){window.dataLayer.push(arguments);}
 gtag('js', new Date());

 gtag('config', 'G-EY9BN9TW8S',{ 'debug_mode': true });
/*SETTING UP GOOGLE TAG MANAGER-- END */


  const { user,error } = useSelector((state) => state.auth);
  //console.log("error is",error)

  useEffect(()=>{
     if(user){
      navigate('/dashboard/home')
     }
  },[])


  useEffect(()=>{
    if(user){
     navigate('/dashboard/home')
    }
 },[])

  const newUser = 
  {
    email,
    firstName,
    lastName,
    password ,
    facebook,
    affiliate,
    pvExamen,
    telephone,
    classOption,
    schoolOrigin
  }
 

  const registerFxn = (user,navigate) =>{
    if(!email || !firstName  || !password ||!facebook|| !affiliate  ||!pvExamen ||!telephone  ||!schoolOrigin ||!classOption ||!schoolOrigin ){
      notifyErrorFxn("Please make sure to fill in all fields")
    }
    else if(telephone.substring(0,3) !== '224'){

      notifyErrorFxn("assurez-vous que le numéro de téléphone commence par 224")
    }
    else{
      dispatch(signup(user,navigate))


      gtag("event", "sign-up", {
       
        fullName:user && user.firstName,
        telephone:user && user.telephone,
        affiliateId:user &&user.affiliate?user.affiliate:"none",
        "registered-with":  "email"
     });
    }
  }


  



  const handleselectedFile = event => {
    //console.log("these are the picture deets!",event.target.files[0])
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    
    setFile(URL.createObjectURL(event.target.files[0]));
    setFileSize(event.target.files[0].size)
};





  return (
    <>
    {page1 &&
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 

    

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"40px"}}>
    <center>
    <h1 style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"30px"}}>Bienvenue à Bonécole!</h1>
    </center>

    </Grid>

  
   

     <Grid container spacing={2} >
  
         <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <img style={{width:"80%"}} src={bonecoleIntro}/>
            </Grid>
         
        </Grid>

      </Grid>



      {error && <div><Alert
        severity="error" color="error"
        action={
          <Button color="inherit" size="small" style={{ fontSize: '15px' }} onClick={() => {dispatch(logoutSuccess())}}>
            <b>X</b>
          </Button>
        }
      >
        <p style={{ fontSize: '14px' }}><b>{error.errorMessage}</b></p>
      </Alert><br/></div>}



      <Grid container item xs={12} spacing={2} style={{ display: 'flex',flexDirection:"column" ,justifyContent: 'center',marginTop:error && error.errorMessage?"20px":"80px",marginBottom:"40px" }}>

      <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>     
     <TextField
          sx ={{width:"100%"}}
          id="outlined-basic"
          label="nom et prénom"
          type="text"
          autoComplete="full name"
          onChange={(e)=>{setFirstName(e.target.value)}}
        />
      </Grid>  

    {/*
      <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>     
     <TextField
          sx ={{width:"100%"}}
          id="outlined-basic"
          label="Last name"
          type="text"
          autoComplete="full name"
          onChange={(e)=>{setLastName(e.target.value)}}
        />
      </Grid>  
       */}


      <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>     
     <TextField
          sx ={{width:"100%"}}
          id="outlined-basic"
          label="adresse e-mail"
          type="email"
          autoComplete="current-email"
          onChange={(e)=>{setEmail(e.target.value)}}
        />
      </Grid>  




    <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
    <TextField
    fullWidth
    placeholder=" "
    variant="outlined"
    multiline
    maxRows={2}
    value={telephone}
    onChange={(e)=>{setTelephone(e.target.value)}}
    label= "Numero de Telephone"
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
          value={classOption}
          label="Classe et option"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Classe et option</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setClassOption(event.target.value);
          }}
        >
       
       <MenuItem disabled value={""}>Classe et Option</MenuItem>
  <MenuItem  value={"6eme Annee"}>6eme Annee</MenuItem>
  <MenuItem   value={"10eme Annee"}>10eme Annee</MenuItem>
  <MenuItem   value={"Terminales"}>Terminales</MenuItem>

       
        </Select>}


    </Grid>
     
     
     
      <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>     
      <TextField 
         sx ={{width:"100%"}}
          id="outlined-password-input"
          label="mot de passe"
          type="password"
          autoComplete="current-password"
          onChange={(e)=>{setPassword(e.target.value)}}
        />
      </Grid> 
         
         
         
          <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
             <Button   variant="contained" 
            style={{ backgroundColor: "#000000",color:"#FFFFFF",width:"75%",height:"3rem",fontSize:"15px",
            }}
            onClick ={()=>{if(email && firstName  && password && telephone && classOption){
              setPage2(true);setPage1(false)
            }
            else{
              notifyErrorFxn("veuillez remplir tous les champs avant de continuer !")
            }
                 
          }}
            >
             S'INSCRIRE
            </Button>
         
          
            <br/><br/><br/>
  
          </Grid>



          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"10px"}}>
         <br/>
       <center>
       <p> Vous avez déjà un compte? &nbsp; <span onClick ={()=>{navigate('/external-login')}}  style={{color:"red",cursor:"pointer",textDecoration:"underline"}}>Se connecter</span> </p>
      </center>

        </Grid>
          

        </Grid>

    
      
    

</Container>
}

{ page2 &&

<Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 

<Button   style={{ backgroundColor: "#000000",color:"#FFFFFF",marginTop:"20px",width:"6rem",height:"3rem",fontSize:"15px",
          }}
 onClick={()=>{setPage2(false);setPage1(true)}}>Back</Button>
    
{firstName && lastName &&
<Grid item xs={12} style={{display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"0rem",paddingBottom:"0px"}}>

 <br/> 
 <h1>Bienvenue,</h1>
<p style={{color:"gray"}}>{firstName}</p>
</Grid>
}



  <Grid container item xs={12} spacing={2} style={{ display: 'flex',flexDirection:"column" ,justifyContent: 'center',marginTop:"10px",marginBottom:"40px" }}>
     
  <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
       
      
   <p style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center" ,width:"95%"}}>  <span>INSCRIPTION (2)</span> <FaCaretDown/></p>
   <Divider variant="fullWidth" sx={{backgroundColor:"#000000",width:"100%"}}  />
    




   <Grid item xs={12} md={8} lg={6}>
    
      <Typography variant="p" component="p">
      image de profil
       </Typography>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 200,
          border: '1px solid grey'
        }}
      >
        <center>
        <Typography
            color="textPrimary"
            variant="h3"
            component="p"
          >
          <Button component="label" style={{backgroundColor: 'white' }}>
         <img src={UPLOADIMG} width='100px' height='100px' />
         <input
            type="file"
            style={{ display: 'none' }}
            onChange={handleselectedFile}
            />
            </Button>
      </Typography>
      <Typography
            color="textPrimary"
            variant="p"
            component="p"
          >
        Parcourir les fichiers à télécharger
      </Typography>
      </center>
      </Paper>
      <p>{selectedFile?.selectedFileName}</p>
    </Grid>


    </Grid>


  

    <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
    <TextField
    fullWidth
    placeholder=" "
    variant="outlined"
    multiline
    maxRows={2}
    //onChange = {(e)=>{setConfirmPassword(e.target.value)}}
    label= "Facebook"
    value={facebook}
    onChange={(e)=>{setFacebook(e.target.value)}}
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
    label= "Identifiant Affilié"
    value={affiliate}
    onChange={(e)=>{setAffiliate(e.target.value)}}
    />
    </Grid>


    <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
    <TextField
    fullWidth
    placeholder=" "
    variant="outlined"
    multiline
    maxRows={2}
    value={schoolOrigin}
    onChange={(e)=>{setSchoolOrigin(e.target.value)}}
    label= "Ecole d'origine"
    />
    </Grid>


 


    <Grid item xs={12} spacing={2} style={{marginTop:"2rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
    <TextField
    fullWidth
    placeholder=" "
    variant="outlined"
    multiline
    maxRows={2}
    value={pvExamen}
    onChange={(e)=>{setPvExamen(e.target.value)}}
    label= "PV examen"
    />
    </Grid>

 

    <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
           <Button   variant="contained" 
          style={{ backgroundColor: "#000000",color:"#FFFFFF",width:"75%",height:"3rem",fontSize:"15px",
          }}
          onClick ={()=>{registerFxn(newUser,navigate)}}
          >
           SOUMETTRE
          </Button>
       
        
          <br/><br/><br/>

     </Grid>

   
    </Grid>



{error && <div><Alert
        severity="error" color="error"
        action={
          <Button color="inherit" size="small" style={{ fontSize: '15px' }} onClick={() => {dispatch(logoutSuccess())}}>
            <b>X</b>
          </Button>
        }
      >
        <p style={{ fontSize: '14px' }}><b>{error.errorMessage}</b></p>
      </Alert><br/></div>}


<Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"10px"}}>
         <br/>
       <center>
       <p> Vous avez déjà un compte? &nbsp; <span onClick ={()=>{navigate('/external-login')}}  style={{color:"red",cursor:"pointer",textDecoration:"underline"}}>Se connecter</span> </p>
      </center>

        </Grid>


</Container>
 }

    </>
  );
}

export default MobileRegisterPage;