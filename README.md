# Fishing & Living App - Engineering Stack & Functionality

## Overview

Fishing & Living is a web-based application that provides users with a platform to explore fishing wobblers, rent apartments, upload images, and check weather forecasts. The app is built using modern web technologies and leverages cloud services for hosting, storage, and email communication.

# Engineering Stack

## Frontend

- Framework: React.js (with React Router for navigation)

- Build Tool: Vite

- Styling: Tailwind CSS

- Component Library: ShadCN/UI

- State Management: React Hooks

- Form Handling: React Hook Form

## Backend

- Serverless Backend: Firebase Functions

- Database: Firebase Firestore

- Authentication: Firebase Authentication (with email and password / without email verification)

- Email Service: EmailJS (for contact form submissions)

- File Storage: Cloudinary (for image uploads)

## Deployment & Hosting

- Frontend Hosting: Firebase Hosting

- Backend Hosting: Firebase Cloud Functions

- Storage for Images: Cloudinary

## APIs & Integrations

- Email Sending: EmailJS

- Image Storage & URL Handling: Cloudinary API

- Weather Forecast: External weather API (from visualcrossing)

# Functionality

## Home Page

- Displays an overview of the Fishing & Living app

- Provides navigation to various features

## Catalog of Fishing Wobblers

- Lists different wobblers with details: title, image, likes, and fish count

- Allows users to like wobblers

- Enables adding new wobblers to the catalog

## Apartment Rentals

- Showcases available apartments for rent

- Displays images, descriptions, and availability details

## Picture Gallery

- Users can view, like and upload images related to their fishing and living experiences (owners can delete their images)

- Uploaded images are stored in Cloudinary, and URLs are saved in Firebase Firestore

## Weather Forecast

- Fetches weather data for a selected location (city, country)

- Displays current temperature, conditions, and 2 week forecast

## Contact Form

- Allows users to send messages via EmailJS

- Ensures users agree to the privacy policy before submitting

## Privacy Policy & Terms of Service

- Displayed as standalone pages for user reference

# Future Enhancements

- Adding "Start Fishing" functionality where you can increment the current wobblers in use

- Adding google login/register through firebase login

- Modifying Contact us functionality (by users sending emails with their own emails that are google verified / currently sending emails 'from' and 'to' the same email)

- Improve UI/UX with animations and better state management

# Conclusion

Fishing & Living is built using a scalable and modern web technology stack, ensuring efficient performance and smooth user experience. The integration of Firebase, Cloudinary, and EmailJS provides seamless data handling, image uploads, and communication features. The project remains open to future enhancements to improve functionality and user engagement.

