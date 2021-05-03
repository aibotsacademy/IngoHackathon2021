'use strict';

const async = require('async');
const FB = require("./facebook.action");

module.exports = {
    say(recipientId, context, message, cb) {

        if (recipientId) {
            FB.sendText(recipientId, message, (err, data) => {
                if (err) {
                    console.log(
                        'Oops! An error occurred while forwarding the response to',
                        recipientId,
                        ':',
                        err
                    );
                }
                cb();
            });
        } else {
            console.log('Oops! Couldn\'t find user for session:', sessionId);
            
            cb();
        }
    },

    merge(recipientId, context, entities, message, cb) {

        async.forEachOf(entities, (entity, key, cb) => {
            const value = firstEntityValue(entity);
            if (value != null && (context[key] == null || context[key] != value)) {

                switch (key) {
                    default:
                        cb();
                }
            }
            else
                cb();

        }, (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Context after merge:\n", context);
                cb(context);
            }
        });
    },
    error(recipientId, context, error) {
        console.log(error.message);
    },
};

const firstEntityValue = (entity) => {
    const val = entity && Array.isArray(entity) &&
            entity.length > 0 &&
            entity[0].value
        ;
    if (!val) {
        return null;
    }
    return typeof val === 'object' ? val.value : val;
};
