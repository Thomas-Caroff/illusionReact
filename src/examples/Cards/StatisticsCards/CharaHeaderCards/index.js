/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
// import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Button, Grid } from "@mui/material";
import MDInput from "components/MDInput";
import { useState, useEffect } from "react";

import { API_URL } from "constants";

function CharaHeaderCard({ health, character }) {
  const [charaForm, setCharaValues] = useState(character);
  const [form, setValues] = useState(health);
  const [isStatEditable, setIsStatEditable] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [isFormAltered, setIsFormAltered] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    setValues(health);
    setCharaValues(character);
  }, [health, character]);

  async function switchEditable() {
    if (isStatEditable && isFormAltered) {
      try {
        const response = await fetch(API_URL + "characterhealth/" + health.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          setSnackbarMessage("Statistiques mises à jour avec succès !");
          setSnackbarSeverity("success");
          setIsFormAltered(false);
        } else {
          setSnackbarMessage("Erreur lors de la mise à jour des statistiques.");
          setSnackbarSeverity("error");
        }
      } catch (error) {
        setSnackbarMessage("Erreur réseau : " + error.message);
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
    }
    setIsStatEditable(!isStatEditable);
  }

  const onChange = (e) => {
    setIsFormAltered(true);
    setValues({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Fermer automatiquement après 4 secondes
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" px={2}>
        <Grid container>
          <Grid item sm={10} px={5} py={1}></Grid>
          <Grid item sm={2} display="flex" justifyContent="flex-end">
            <Button color="dark" onClick={switchEditable}>
              <Icon>settings</Icon>
            </Button>
          </Grid>
        </Grid>
      </MDBox>
      <Divider />
      <MDBox display="flex" justifyContent="space-between" px={2}>
        <Grid item sm={8} md={6} lg={8}>
          {!isStatEditable ? (
            <MDTypography
              textAlign="left"
              variant="h4"
              color="dark"
              display="inline"
              sx={{
                fontSize: "1.25rem",
              }}
            >
              {charaForm.character_name}
            </MDTypography>
          ) : (
            <Grid container>
              <MDTypography
                textAlign="left"
                variant="h4"
                color="dark"
                display="inline"
                sx={{
                  fontSize: "1.25rem",
                }}
              >
                Nom :&nbsp;
              </MDTypography>
              <MDInput
                variant="standard"
                textAlign="left"
                color="dark"
                display="inline"
                type="text"
                sx={{
                  textAlign: "center",
                }}
                id="character_name"
                value={charaForm.character_name}
                onChange={onChange}
              />
            </Grid>
          )}
        </Grid>
        <Divider>&nbsp;</Divider>
        <Grid item sm={4} md={6} lg={2}>
          {!isStatEditable ? (
            <MDTypography
              textAlign="left"
              variant="h4"
              color="dark"
              display="inline"
              sx={{
                fontSize: "1.25rem",
              }}
            >
              Niveau : {charaForm.level}
            </MDTypography>
          ) : (
            <Grid container>
              <MDTypography
                textAlign="left"
                variant="h4"
                color="dark"
                display="inline"
                sx={{
                  fontSize: "1.25rem",
                }}
              >
                Niveau :&nbsp;
              </MDTypography>
              <MDInput
                variant="standard"
                textAlign="left"
                color="dark"
                display="inline"
                type="number"
                sx={{
                  width: "3rem",
                  textAlign: "center",
                }}
                id="level"
                value={charaForm.level}
                onChange={onChange}
              />
            </Grid>
          )}
        </Grid>
      </MDBox>
      <MDBox mb={1} />
      <MDBox display="flex" justifyContent="space-between" alignItems="center" px={2}>
        <Grid item sm={6} md={6} lg={7}>
          {!isStatEditable ? (
            <MDTypography
              textAlign="left"
              variant="h4"
              color="dark"
              display="inline"
              sx={{
                fontSize: "1.25rem",
              }}
            >
              PV : {form.current_hp + " / " + form.max_hp}
            </MDTypography>
          ) : (
            <Grid container>
              <MDTypography
                textAlign="left"
                variant="h4"
                color="dark"
                display="inline"
                sx={{
                  fontSize: "1.25rem",
                }}
              >
                PV :&nbsp;
              </MDTypography>
              <MDInput
                variant="standard"
                textAlign="left"
                color="dark"
                display="inline"
                type="number"
                sx={{
                  width: "3rem",
                  textAlign: "center",
                }}
                id="current_hp"
                value={form.current_hp}
                onChange={onChange}
              />
              <MDTypography
                textAlign="left"
                variant="h4"
                color="dark"
                display="inline"
                sx={{
                  fontSize: "1.25rem",
                }}
              >
                /&nbsp;
              </MDTypography>
              <MDInput
                variant="standard"
                textAlign="left"
                color="dark"
                display="inline"
                type="number"
                sx={{
                  width: "3rem",
                  textAlign: "center",
                }}
                id="max_hp"
                value={form.max_hp}
                onChange={onChange}
              />
            </Grid>
          )}
        </Grid>
        <Divider orientation="vertical" />
        <Grid item sm={6} md={6} lg={5}>
          {!isStatEditable ? (
            <MDTypography
              textAlign="left"
              variant="h4"
              color="dark"
              display="inline"
              sx={{
                fontSize: "1.25rem",
              }}
            >
              Seuil de blessure : {form.injury_threshold}
            </MDTypography>
          ) : (
            <Grid container>
              <MDTypography
                textAlign="left"
                variant="h4"
                color="dark"
                display="inline"
                sx={{
                  fontSize: "1.25rem",
                }}
              >
                Seuil de blessure :&nbsp;
              </MDTypography>
              <MDInput
                variant="standard"
                textAlign="left"
                color="dark"
                display="inline"
                type="number"
                sx={{
                  width: "3rem",
                  textAlign: "center",
                }}
                id="injury_threshold"
                value={form.injury_threshold}
                onChange={onChange}
              />
            </Grid>
          )}
        </Grid>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" px={2}>
        <Grid item sm={6} md={6} lg={8}>
          {!isStatEditable ? (
            <MDTypography
              textAlign="left"
              variant="h4"
              color="dark"
              display="inline"
              sx={{
                fontSize: "1.25rem",
              }}
            >
              PV temporaires : {form.temporary_hp}
            </MDTypography>
          ) : (
            <Grid container>
              <MDTypography
                textAlign="left"
                variant="h4"
                color="dark"
                display="inline"
                sx={{
                  fontSize: "1.25rem",
                }}
              >
                PV temporaires :&nbsp;
              </MDTypography>
              <MDInput
                variant="standard"
                textAlign="left"
                color="dark"
                display="inline"
                type="number"
                sx={{
                  width: "3rem",
                  textAlign: "center",
                }}
                id="temporary_hp"
                value={form.temporary_hp}
                onChange={onChange}
              />
            </Grid>
          )}
        </Grid>
        <Grid item sm={6} md={3} lg={3}>
          {!isStatEditable ? (
            <MDTypography
              textAlign="left"
              variant="h4"
              color="dark"
              display="inline"
              sx={{
                fontSize: "1.25rem",
              }}
            >
              Dé vie : {form.hp_dice}
            </MDTypography>
          ) : (
            <Grid container>
              <MDTypography
                textAlign="left"
                variant="h4"
                color="dark"
                display="inline"
                sx={{
                  fontSize: "1.25rem",
                }}
              >
                Dé vie :&nbsp;
              </MDTypography>
              <MDInput
                variant="standard"
                textAlign="left"
                color="dark"
                display="inline"
                type="text"
                sx={{
                  width: "3rem",
                  textAlign: "center",
                }}
                id="hp_dice"
                value={form.hp_dice}
                onChange={onChange}
              />
            </Grid>
          )}
        </Grid>
      </MDBox>
    </Card>
  );
}

export default CharaHeaderCard;
