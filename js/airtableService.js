import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } from './config.js';

export async function fetchUniversities() {
    try {
        const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`
            }
        });
        const data = await response.json();
        return data.records;
    } catch (error) {
        console.error('Error fetching universities:', error);
        throw error;
    }
}

export async function fetchUniversityFields(universityId) {
    try {
        const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${universityId}`, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`
            }
        });
        const data = await response.json();
        return data.fields;
    } catch (error) {
        console.error('Error fetching university fields:', error);
        throw error;
    }
}




