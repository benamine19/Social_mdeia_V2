import * as React from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import {
  useGetNonFriendsQuery,
  useGetInvitationsforsenderQuery,
  useGetInvitationsQuery,
} from "../redux/api/friendApi";
import Invitationslijawk from "../components/Invitationslijawk";
import Suggestion_amis from "../components/Suggestion_amis";
import InvitationsForSender from "../components/InvitationsForSender";
import "../components/invi.css"; // Assurez-vous que le chemin est correct

export default function Findfriends() {
  // media query
  const isMinWidth800 = useMediaQuery("(min-width:800px)");
  const isMaxWidth400 = useMediaQuery("(max-width:450px)");
  const isMinWidth1000 = useMediaQuery("(min-width:1000px)");

  const { user } = useSelector((state) => state.user);
  const token = JSON.parse(localStorage.getItem("token"));
  const userId = user?._id;
  const {
    data: nonFriendsData,
    error: nonFriendsError,
    isLoading: nonFriendsLoading,
  } = useGetNonFriendsQuery({ token });
  const {
    data: invitationsForSenderData,
    error: invitationsForSenderError,
    isLoading: invitationsForSenderLoading,
  } = useGetInvitationsforsenderQuery({ token });
  const {
    data: invitationsData,
    error: invitationsError,
    isLoading: invitationsLoading,
  } = useGetInvitationsQuery({ token });

  if (nonFriendsLoading) {
    return (
      <Box sx={{ display: isMinWidth800 ? "block" : "none", width: "25%" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: isMaxWidth400 ? "100%" : isMinWidth1000 ? "35%" : "50%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "120px",
      }}
    >
      <Paper sx={{ padding: 2 }}>
        <Box
          sx={{
            textAlign: "center",
            borderRadius: "20px",
            width: "80%",
            maxWidth: 600, // Limite la largeur maximale pour une meilleure lisibilité
            margin: "auto",
            padding: 2, // Ajoute du padding pour un espacement interne
            backgroundColor: "background.paper", // Utilise les couleurs du thème
            boxShadow: 1, // Ajoute une légère ombre pour donner de la profondeur
          }}
        >
          <Typography
            sx={{ fontFamily: "Arial, sans-serif" }} // Change la police de caractères
            variant="body1"
          >
you are send this friend requesta

</Typography>
        </Box>
        <List
          className="container"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            overflowX: "auto",
          }}
        >
          {invitationsData &&
            invitationsData.map((recive) => (
              <React.Fragment>
                <ListItem>
                  <Invitationslijawk recive={recive} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
      </Paper>
      <Paper sx={{ padding: 2 }}>
        <Box
          sx={{
            textAlign: "center",
            borderRadius: "20px",
            width: "80%",
            maxWidth: 600, // Limite la largeur maximale pour une meilleure lisibilité
            margin: "auto",
            padding: 2, // Ajoute du padding pour un espacement interne
            backgroundColor: "background.paper", // Utilise les couleurs du thème
            boxShadow: 1, // Ajoute une légère ombre pour donner de la profondeur
          }}
        >
          <Typography
            sx={{ fontFamily: "Arial, sans-serif" }} // Change la police de caractères
            variant="body1"
          >
            you are send this friend requesta
          </Typography>
        </Box>
        <List
          className="container"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            overflowX: "auto",
          }}
        >
          {invitationsForSenderData &&
            invitationsForSenderData.map((send) => (
              <React.Fragment>
                <ListItem>
                  <InvitationsForSender send={send} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
      </Paper>

      <Paper sx={{ padding: 2 }}>
        <Box
          sx={{
            textAlign: "center",
            borderRadius: "20px",
            width: "80%",
            maxWidth: 600, // Limite la largeur maximale pour une meilleure lisibilité
            margin: "auto",
            padding: 2, // Ajoute du padding pour un espacement interne
            backgroundColor: "background.paper", // Utilise les couleurs du thème
            boxShadow: 1, // Ajoute une légère ombre pour donner de la profondeur
          }}
        >
          <Typography
            sx={{ fontFamily: "Arial, sans-serif" }} // Change la police de caractères
            variant="body1"
          >
            may be you know this users
          </Typography>
        </Box>
        <List
          className="container"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            overflowX: "auto",
          }}
        >
          {nonFriendsData &&
            nonFriendsData.map((usernonfriend) => (
              <React.Fragment>
                <ListItem>
                  <Suggestion_amis usernonfriend={usernonfriend} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
      </Paper>
    </Box>
  );
}
