# Bossjob Frontend Test

## Instruction
Please implement the job list page as per design (job-list-design.jpg). 
Please use this git repository as a starter kit. This has been created using CRA.
NOTE: Please do not use any UI library.

The app should be able to do as follow:
1. Listing the first 12 jobs
2. Able to search for job by title or company name
3. Use redux && (redux-saga || redux-thunk) to store the application states
4. Please do code the `Filter results` button, but no functionality is neccessary
5. Pagination is not neccessary, but you will get a bonus point for doing it

## API Endpoint
Please use this provided api to retrieve the job list. 
`https://search.bossjob.com/api/v1/search/job_filter?size=10&query=system`

```
size - to specify number of jobs to be retrieved (default is 4)
query - to specify which job title / company name to be retrieved
page - to specify the page to be retrieved

```
------

Below will be the necessary key that you will use from the JSON response

```
{
    "message": "OK",
    "data": {
        "jobs": [
            {
                "id": 17348,
                "degree": "Diploma",
                "job_title": "System Engineer",
                "job_country": "Philippines",
                "job_type": "Full-time",
                "job_location": "Makati",
                "salary_range_from": 30000,
                "salary_range_to": 40000,
                "company_name": "wealth access inc.",
                "company_location": "Makati",
                "xp_lvl": "3 - 5 years",
            }
        ],
        "page": 1,
        "size": 10,
        "total_num": 265,
        "sort": 1

    }
}
```

You could ignore the rest of the keys.

================

