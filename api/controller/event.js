import multer from 'multer';
import Event from '../models/Event.js';

// Set up multer storage
const storage = multer.memoryStorage();

// Create multer middleware for handling file uploads
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB limit (adjust as needed)
    },
}).single('image'); 

export const createEvent = async (req, res, next) => {

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        const newEvent = new Event({
            ...req.body,
            image: req.file ? req.file.buffer.toString('base64') : '', // Save the base64-encoded image in the database
        });

        try {
            const savedEvent = await newEvent.save();
            res.status(201).json(savedEvent);
        } catch (err) {
            next(err);
        }
    });
};



export const updateEvent = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        try {
            const updatedEventData = {
                ...req.body,
            };

            
            if (req.file) {
                updatedEventData.image = req.file.buffer.toString('base64');
            }

            const updatedEvent = await Event.findByIdAndUpdate(
                req.params.id,
                { $set: updatedEventData },
                { new: true }
            );

            res.status(200).json(updatedEvent);
        } catch (err) {
            next(err);
        }
    });
};


export const deleteEvent = async (req, res, next) => {
    try {
        await Event.findByIdAndDelete(
            req.params.id,
        );
        res.status(200).json("Event has been Deleted");
    } catch (err) {
        next(err)
    }
}

export const getEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(
            req.params.id
        );
        res.status(200).json(event);
    } catch (err) {
        next(err)
    }
}

// export const getAllEvent = async (req, res, next) => {
//     try {
//         const events = await Event.find();
//         res.status(200).json(events);
//     } catch (err) {
//         next(err)
//     }
// }

const eventsStorage = [];
export const getAllEvent = async (req, res, next) => {
    try {
        if (eventsStorage.length === 0) {
            const events = await Event.find();
            eventsStorage.push(...events);
        } 
        res.status(200).json(...eventsStorage);
    } catch (err) {
        next(err);
    }
}



// comments
export const addComment = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const newComment = {
            userId: req.body.userId,
            content: req.body.content,
            userName: req.body.userName,
            pId: req.body.pId
        };

        if (newComment.pId) {
            // If it's a reply, find the parent comment and add the reply to its 'replies' array
            const parentComment = event.comments.id(newComment.pId);
            if (parentComment) {
                parentComment.replies.push(newComment);
            } else {
                return res.status(404).json({ error: 'Parent comment not found' });
            }
        } else {
            // If it's a new comment (not a reply), add it to the 'comments' array
            event.comments.push(newComment);
        }

        await event.save();

        res.status(200).json(event);
    } catch (err) {
        next(err);
    }
};



export const updateComment = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        // Find the comment with the specified commentId
        const comment = event.comments.id(req.params.commentId);

        // Check if the comment with the specified commentId exists
        if (!comment) {
            const parentCommentIndex = event.comments.findIndex(comment => comment.replies.some(reply => reply._id == req.params.commentId));

            if (parentCommentIndex !== -1) {
                // Find the reply within the replies array of the parent comment
                const reply = event.comments[parentCommentIndex].replies.find(reply => reply._id == req.params.commentId);

                // Check if the reply with the specified commentId exists
                if (reply) {
                    // Update the content of the found reply
                    reply.content = req.body.content;

                    // Save the changes to the event document
                    await event.save();

                    // Return the updated event document
                    res.status(200).json(event);
                } else {
                    res.status(404).json({ success: false, message: 'Reply not found :(' });
                }
            } else {
                res.status(404).json({ success: false, message: 'Comment not found :(' });
            }
        } else {
            // Update the content of the found comment
            comment.content = req.body.content;

            // Save the changes to the event document
            await event.save();

            // Return the updated event document
            res.status(200).json(event);
        }
    } catch (err) {
        next(err);
    }
};


export const deleteComment = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        // Find the index of the comment with the specified commentId
        const commentIndex = event.comments.findIndex(comment => comment._id == req.params.commentId);
        
        // Check if the comment with the specified commentId exists
        if (commentIndex !== -1) {
            // Remove the comment at the found index
            event.comments.splice(commentIndex, 1);
            await event.save();

            res.status(200).json(event);
        } else {
            const parentCommentIndex = event.comments.findIndex(comment => comment.replies.some(reply => reply._id == req.params.commentId));

            if (parentCommentIndex !== -1) {
                // Find the index of the reply within the replies array of the parent comment
                const replyIndex = event.comments[parentCommentIndex].replies.findIndex(reply => reply._id == req.params.commentId);

                // Check if the reply with the specified commentId exists
                if (replyIndex !== -1) {
                    // Remove the reply at the found index
                    event.comments[parentCommentIndex].replies.splice(replyIndex, 1);
                    await event.save();
                    res.status(200).json(event);
                } else {
                    res.status(404).json({ success: false, message: 'Reply not found :(' });
                }
            } else {
                res.status(404).json({ success: false, message: 'Parent comment not found :(' });
            }

        }
    } catch (err) {
        next(err);
    }
};






