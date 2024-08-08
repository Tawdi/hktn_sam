// controllers/eventController.js
// const EventModel = require('../models/eventModel');

// const getAllEvents = (req, res) => {
//   EventModel.getAllEvents(events => {
//     res.json(events);
//   });
// };

// const getEventById = (req, res) => {
//   const id = parseInt(req.params.id);
//   EventModel.getEventById(id, event => {
//     res.json(event);
//   });
// };

// const createEvent = (req, res) => {
//   const eventData = req.body;
//   EventModel.createEvent(eventData, id => {
//     res.status(201).json({ id });
//   });
// };

// const updateEvent = (req, res) => {
//   const id = parseInt(req.params.id);
//   const eventData = req.body;
//   EventModel.updateEvent(id, eventData, affectedRows => {
//     res.json({ affectedRows });
//   });
// };

// const deleteEvent = (req, res) => {
//   const id = parseInt(req.params.id);
//   EventModel.deleteEvent(id, affectedRows => {
//     res.json({ affectedRows });
//   });
// };

// module.exports = {
//   getAllEvents,
//   getEventById,
//   createEvent,
//   updateEvent,
//   deleteEvent
// };
// controllers/eventController.js
// **********************************************
// const EventModel = require('../models/eventModel');

// // const getAllEvents = (req, res) => {
// //   EventModel.getAllEvents(events => {
// //     res.render('event/evenement_list', { events });
// //   });
// // };
// // const getAllEvents = (req, res) => {
// //     EventModel.getAllEvents(events => {
// //       res.render('event/evenement_list', { events, messages: req.flash() });
// //     });
// //   };
// const getAllEvents = async (req, res) => {
//     try {
//         const events = await EventModel.getAllEvents();
//         console.log('Events fetched:', events); // Debugging line
//         res.render('event/evenement_list', { events, messages: req.flash() });
//     } catch (error) {
//         console.error('Error in getAllEvents:', error); // Debugging line
//         res.status(500).send('Internal Server Error');
//     }
// };
// const getEventById = (req, res) => {
//     const id = parseInt(req.params.id);
//     EventModel.getEventById(id, event => {
//         res.render('event/details', { event });
//     });
// };

// const createEvent = (req, res) => {
//   const eventData = req.body;
//   EventModel.createEvent(eventData, id => {
//     req.flash('success', 'Event created successfully');
//     res.redirect('/event');
//   });
// };

// const updateEvent = (req, res) => {
//   const id = parseInt(req.params.id);
//   const eventData = req.body;
//   EventModel.updateEvent(id, eventData, affectedRows => {
//     req.flash('success', 'Event updated successfully');
//     res.redirect('/event');
//   });
// };

// const deleteEvent = (req, res) => {
//   const id = parseInt(req.params.id);
//   EventModel.deleteEvent(id, affectedRows => {
//     req.flash('success', 'Event deleted successfully');
//     res.redirect('/event');
//   });
// };

// module.exports = {
//   getAllEvents,
//   getEventById,
//   createEvent,
//   updateEvent,
//   deleteEvent
// };

// ******************************

// const EventModel = require('../models/eventModel');
// const upload = require('../config/multer');
// // Fetch all events and render them
// const getAllEvents = async (req, res) => {
//     try {
//         const events = await EventModel.getAllEvents();
//         // console.log('Events fetched:', events); // Debugging line
//         res.render('event/evenement_list', { events, messages: req.flash() });
//     } catch (error) {
//         console.error('Error in getAllEvents:', error); // Debugging line
//         res.status(500).send('Internal Server Error');
//     }
// };

// // Fetch a single event by ID and render it
// const getEventById = async (req, res) => {
//     const id = parseInt(req.params.id);
//     try {
//         const event = await EventModel.getEventById(id);
//         if (event) {
//             res.render('event/details', { event });
//         } else {
//             res.status(404).send('Event not found');
//         }
//     } catch (error) {
//         console.error('Error in getEventById:', error); // Debugging line
//         res.status(500).send('Internal Server Error');
//     }
// };

// // Create a new event
// const createaaEvent = async (req, res) => {
//     const eventData = req.body;
//     try {
//         await EventModel.addEvent(eventData);
//         req.flash('success', 'Event created successfully');
//         res.redirect('/event');
//     } catch (error) {
//         console.error('Error in createEvent:', error); // Debugging line
//         req.flash('error', 'Failed to create event');
//         res.redirect('/admin');
//     }
// };
// const createEvent = async (req, res) => {
//     upload.single('image_url')(req, res, async (err) => {
//         if (err) {
//             req.flash('error', err.message);
//             return res.redirect('/admin');
//         }
//         const { titre, apercu, description, date_debut, date_fin, time, lieu, observations, participation, info_add } = req.body;
//         try {
//             const newEvent = {
//                 titre,
//                 image_url: req.file ? req.file.path : '', // Use the uploaded file path
//                 apercu,
//                 description,
//                 date_debut,
//                 date_fin,
//                 time,
//                 lieu,
//                 observations,
//                 participation,
//                 info_add
//             };
//             await EventModel.addEvent(newEvent);
//             req.flash('success', 'Event created successfully');
//             res.redirect('/event');
//         } catch (error) {
//             console.error('Error in createEvent:', error);
//             req.flash('error', 'Failed to create event');
//             res.redirect('/admin');
//         }
//     });
// };

// // Update an existing event
// const updateEvent = async (req, res) => {
//     const id = parseInt(req.params.id);
//     const eventData = req.body;
//     try {
//         const affectedRows = await EventModel.updateEvent(id, eventData);
//         if (affectedRows > 0) {
//             req.flash('success', 'Event updated successfully');
//         } else {
//             req.flash('error', 'Event not found or no changes made');
//         }
//         res.redirect('/event');
//     } catch (error) {
//         console.error('Error in updateEvent:', error); // Debugging line
//         req.flash('error', 'Failed to update event');
//         res.redirect('/event');
//     }
// };

// // Delete an event
// const deleteEvent = async (req, res) => {
//     const id = parseInt(req.params.id);
//     try {
//         const affectedRows = await EventModel.deleteEvent(id);
//         if (affectedRows > 0) {
//             req.flash('success', 'Event deleted successfully');
//         } else {
//             req.flash('error', 'Event not found');
//         }
//         res.redirect('/event');
//     } catch (error) {
//         console.error('Error in deleteEvent:', error); // Debugging line
//         req.flash('error', 'Failed to delete event');
//         res.redirect('/event');
//     }
// }; 

// module.exports = {
//     getAllEvents,
//     getEventById,
//     createEvent,
//     updateEvent,
//     deleteEvent
// };

// ************
const { body, validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs").promises;
const Event = require("../models/eventModel");
const Speaker = require("../models/Speaker");
const Program = require("../models/Program");
const Candidature = require("../models/Candidature");
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/img');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  }
});

const upload = multer({ storage: storage });

// const getAllEvents = async (req, res) => {
    //     try {
    //         const events = await EventModel.getAllEvents();
    //         // console.log('Events fetched:', events); // Debugging line
    //         res.render('event/evenement_list', { events, messages: req.flash() });
    //     } catch (error) {
    //         console.error('Error in getAllEvents:', error); // Debugging line
    //         res.status(500).send('Internal Server Error');
    //     }
    // };
// Show all events page
module.exports.showEventsPage = async (req, res) => {
  try {
    const events = await Event.getAllEvents();
    res.render("event/evenement_list", { events });
  } catch (err) {
    console.error("Error fetching events:", err);
    req.flash("error_msg", "Error fetching events.");
    res.redirect("/");
  }
};

// Fetch a single event by ID and render it
module.exports.getEventById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const event = await Event.getEventById(id);
        if (event) {
            res.render('event/details', { event });
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        console.error('Error in getEventById:', error); // Debugging line
        res.status(500).send('Internal Server Error');
    }
};

// Show home page
// module.exports.showHomePage = async (req, res) => {
//   try {
//     // Fetch events data
//     const events = await Event.getAllEvents();

//     // Fetch news data from the JSON file
//     const newsFilePath = path.join(__dirname, "../data/news.json"); // Adjust the path if needed
//     const newsData = await fs.readFile(newsFilePath, "utf8");
//     const newsArray = JSON.parse(newsData);

//     // Render the home page with both events and news data
//     res.render("home", { events, news: newsArray });
//   } catch (err) {
//     console.error("Error fetching events or news:", err);
//     req.flash("error_msg", "Error fetching events or news.");
//     res.redirect("/");
//   }
// };
module.exports.showHomePage = async (req, res) => {
    try {
      // Fetch events data
      const events = await Event.getAllEvents();
  
      // Fetch news data from the JSON file
      const newsFilePath = path.join(__dirname, "../data/news.json"); // Adjust the path if needed
      const newsData = await fs.readFile(newsFilePath, "utf8");
      const newsArray = JSON.parse(newsData);
  
      // Render the home page with both events and news data
      res.render("home", { events, news: newsArray });
    } catch (err) {
      console.error("Error fetching events or news:", err);
      req.flash("error_msg", "Error fetching events or news.");
      res.redirect("/");
    }
  };

// Show specific event page
module.exports.showEventPage = async (req, res) => {
  const { id } = req.params; // Use req.params for route parameters
  try {
    const event = await Event.getEventById(id);
    const speakers = await Speaker.getByEventId(id);
    const programmes = await Program.getByEventId(id);

    // Extract unique days
    const uniqueDays = [...new Set(programmes.map((program) => program.jour))];

    const dayWiseProgrammes = {};
    for (let programme of programmes) {
      const day = programme.jour;
      if (!dayWiseProgrammes[day]) {
        dayWiseProgrammes[day] = [];
      }

      // Parse the plan JSON
      const activities = programme.plan;

      for (let activity of activities) {
        const speaker = await Speaker.getById(activity.speaker_id);
        dayWiseProgrammes[day].push({
          activity: activity.activity,
          time: activity.time,
          speakerName: `${speaker.nom} ${speaker.prenom}`,
          speakerImage: speaker.image_url,
        });
        dayWiseProgrammes[day].sort((a, b) => {
          // You may need to implement a more specific time parsing/comparison if needed
          return (
            new Date("1970/01/01 " + a.time) - new Date("1970/01/01 " + b.time)
          );
        });
      }
    }

    let candidatureExists = false;
    if (req.user) {
      const user_id = req.user.id;
      const existingCandidature = await Candidature.getByUserIdAndEventId(user_id, id);
      candidatureExists = existingCandidature.length > 0;
    }

    if (event) {
      res.render("event", { 
        event, 
        user: req.user, 
        speakers, 
        uniqueDays, 
        dayWiseProgrammes,
        candidatureExists // Pass the candidature status to the view
      });
    } else {
      req.flash("error_msg", "Event not found.");
      res.redirect("/events");
    }
  } catch (err) {
    console.error("Error fetching event:", err);
    req.flash("error_msg", "Error fetching event.");
    res.redirect("/events");
  }
};
const validateTime = (value) => {
  return !value || /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
};

module.exports.addEvent = [
  upload.single('image_url'), // Handle single file upload

  body("titre")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .trim()
    .escape(),
  body("apercu")
    .isLength({ min: 3 })
    .withMessage("Apercu must be at least 3 characters long")
    .trim()
    .escape(),
  body("description")
    .optional()
    .trim()
    .escape(),
  body("date_debut")
    .isISO8601()
    .withMessage("Date Debut must be a valid ISO date"),
  body("date_fin")
    .optional()
    .custom(value => {
      if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw new Error("Date Fin must be a valid ISO date");
      }
      return true;
    }),
  body("time")
    .optional()
    .custom(value => {
      if (value && !validateTime(value)) {
        throw new Error("Time must be a valid time in HH:MM format");
      }
      return true;
    }),
  body("lieu")
    .isLength({ min: 3 })
    .withMessage("Lieu must be at least 3 characters long")
    .trim()
    .escape(),
  body("observations").optional().trim().escape(),
  body("participation").optional().trim().escape(),
  body("info_add").optional().trim().escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array()); // Log the validation errors
      req.flash(
        "error_msg",
        errors.array().map((err) => err.msg)
      );
      return res.redirect("/create_event");
    }

    const {
      titre,
      apercu,
      description,
      date_debut,
      date_fin,
      time,
      lieu,
      observations,
      participation,
      info_add,
    } = req.body;

    // Handle image URL
    const imageUrl = req.file ? `/${req.file.filename}` : null;

    // Set date_fin and time to null if not defined
    const finalDateFin = date_fin ? date_fin : null;
    const finalTime = time ? time : null;

    try {
      await Event.addEvent(
        titre,
        apercu,
        description,
        imageUrl,
        date_debut,
        finalDateFin,
        finalTime,
        lieu,
        observations,
        participation,
        info_add
      );
      req.flash("success_msg", "Event added successfully.");
      res.redirect("/admin");
    } catch (err) {
      console.error("Error adding event:", err);
      req.flash("error_msg", "Error adding event.");
      res.redirect("/create_event");
    }
  },
];

// Update an existing event
module.exports.updateEvent = [
  body("id").isInt().withMessage("Event ID must be a number"),
  body("titre")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long")
    .trim()
    .escape(),
  body("apercu").optional().trim().escape(),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long")
    .trim()
    .escape(),
  body("date").isISO8601().withMessage("Date must be a valid ISO date"),
  body("time").isISO8601().withMessage("Time must be a valid ISO time"),
  body("lieu").optional().trim().escape(),
  body("plan")
    .optional()
    .isJSON()
    .withMessage("Plan must be a valid JSON format"),
  body("observations").optional().trim().escape(),
  body("participation").optional().trim().escape(),
  body("info_add").optional().trim().escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash(
        "error_msg",
        errors.array().map((err) => err.msg)
      );
      return res.redirect("/events");
    }

    const {
      id,
      titre,
      apercu,
      description,
      image_url,
      date,
      time,
      lieu,
      plan,
      observations,
      participation,
      info_add,
    } = req.body;

    try {
      await Event.updateEvent(
        id,
        titre,
        apercu,
        description,
        image_url,
        date,
        time,
        lieu,
        plan,
        observations,
        participation,
        info_add
      );
      req.flash("success_msg", "Event updated successfully.");
      res.redirect("/events");
    } catch (err) {
      console.error("Error updating event:", err);
      req.flash("error_msg", "Error updating event.");
      res.redirect("/events");
    }
  },
];

module.exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await Event.deleteEvent(id);
    req.flash("success_msg", "Event deleted successfully.");
    res.redirect("/events");
  } catch (err) {
    console.error("Error deleting event:", err);
    req.flash("error_msg", "Error deleting event.");
    res.redirect("/events");
  }
};

  


// EventController.js (Controller)

module.exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    titre,
    apercu,
    description,
    date_debut,
    date_fin,
    time,
    lieu,
    observations,
    participation,
    info_add,
  } = req.body;

  // Log the request body for debugging
  console.log("Request Body:", req.body);
  
  // Handle image URL
  const imageUrl = req.file ? `/img/${req.file.filename}` : req.body.existing_image;
  
  try {
    await Event.updateEvent(
      id,
      titre,
      apercu,
      description,
      imageUrl,
      date_debut,
      date_fin,
      time,
      lieu,
      observations,
      participation,
      info_add
    );
    req.flash("success_msg", "Event updated successfully.");
    res.redirect("/events");
  } catch (err) {
    console.error("Error updating event:", err);
    req.flash("error_msg", "Error updating event.");
    res.redirect(`/modifyevent/${id}`);
  }
};

// *************


// const eventModel = require('../models/eventModel');
// const speakerModel = require('../models/speakerModel');
// const sponsorModel = require('../models/sponsorModel');

// exports.createEvent = async (req, res) => {
//     const eventData = req.body;

//     try {
//         // Create the event and get the event ID
//         const eventId = await eventModel.createEvent(eventData);

//         // Add sponsors and speakers for the event
//         if (eventData.sponsors) {
//             await sponsorModel.addSponsors(eventData.sponsors, eventId);
//         }

//         if (eventData.speakers) {
//             await speakerModel.addSpeakers(eventData.speakers, eventId);
//         }

//         res.redirect('/events');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Erreur lors de la création de l\'événement.');
//     }
// };
