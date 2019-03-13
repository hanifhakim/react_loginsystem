import axios from "axios";
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onLoginClick = (user, pass) => {
  return dispatch => {
    axios
      .get("http://localhost:1996/users", {
        params: {
          username: user,
          password: pass
        }
      })
      .then(res => {
        if (res.data.length > 0) {
          // jika ada isinya
          // console.log(res.data[0]);
          // destructuring pengambilan objek dalam array
          const { id, username } = res.data[0];

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { id, username }
            // penyederhaan karena property dan value sama
          });
          // Membuat sebuah file cookie dengan nama masihLogin, dan valuenya adalah username yg login
                // path : "/" agar dapat diakses di setiap component
          cookie.set('masihLogin', username, {path:'/'})

        } else {
          // jika data tidak ditemukan
         dispatch({
           type: "AUTH_ERROR",
           payload: "USERNAME AND PASSWORD NOT MACTH"
         });
        }
      })
      .catch(err => {
        console.log("Error Mas");
      });
  };
};

export const onLogoutUser = () => {

  cookie.remove('masihLogin')

  return {
    type: "LOGOUT_SUCCESS"
  };
};

export const onTimeOut = () => {
  return {
    type: "AUTH_OUT"
  }
}

export const onRegist = (user, email, pass) => {
    return dispatch => {
      axios
      .get("http://localhost:1996/users", {
        params: {
          username: user,
        }
      }).then(res => {
        if(res.data.length === 0){
          axios.post("http://localhost:1996/users", {
            username: user,
            email: email,
            password: pass
        }).then(res =>{
            dispatch({
              type:"AUTH_SUCCESS",
              payload:"REGISTRATION SUCCEDED"
            });
            // setelah tiga detik akan kirim action untuk menghapus pesan error dan success
                // ini akan menyebabkan component render ulang dan menghilangkan pesan error pada
                // login dan register
            setTimeout(() => {
              dispatch({
                type: "AUTH_OUT"
              })
            }, 2000);
            
        }).catch(err =>{
            console.log(err);
            
        })
          
        } else {
         dispatch({
           type:"AUTH_ERROR",
           payload: "USERNAME HAS BEEN TAKEN"
         })
        }
      })

   
    }
}

export const keepLogin = (user) => {
  return dispatch => {
    axios.get('http://localhost:1996/users', {
      params: {
        username: user
      }
    })
      .then(res=>{
        if(res.data.length > 0) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {username:user}
          })
        }
      })
  }
}


