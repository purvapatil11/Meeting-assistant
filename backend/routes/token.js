const express = require("express");
const { AccessToken } = require("livekit-server-sdk");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { roomName, participantName } = req.body;

    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: participantName,
      }
    );

    token.addGrant({
      roomJoin: true,
      room: roomName,
    });

    res.json({
      token: await token.toJwt(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create token" });
  }
});

module.exports = router;