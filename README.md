# OVERVIEW

Food List is a website that displays the top 10 dishes in a region and is made with ReactJS and GraphQL by Kelsey Yim, Henry Yang, and Jorge Carlos.

![Main Page](/sc_1.png "Main Page")

The purpose of this project is to help individuals decide what they should order at a given restaurant. While Yelp has amazing recommendations for which restaurants to visit, deciding on a dish after arriving can be rather difficult unless sifting through lots of reviews.

The website displays the top 10 dishes in each area, displaying a picture and “tags” to describe what the dish is (e.g. Japanese, Salad, Vegetarian). Upon clicking on the “More info” tab, information about the restaurant is shown.

![List of Food](/sc_2.png "Food List")
![Expanded food list item](/sc_3.png "Expanded food list item")

The dish rankings are dynamic and encourages restaurants to compete with one another. The more positive ratings a dish gets, the higher rank it achieves. Ratings can be given by clicking on the stars.

# HOW TO RUN

After cloning both food-list and graphql-server, run the commands yarn && yarn start inside of both folders. This will allow the GraphQL Server to run first so information can display correctly on the local website.

# ABOUT THE GRAPHQL SERVER

The GraphQL server is a stitched schema of Yelp’s GraphQL API and our own schema, which stores the dishes.

# ADDITIONAL INFORMATION

This website is still a work in progress. Currently, the Los Angeles and San Francisco locations pull the correct data. Other locations will be available in the future!
