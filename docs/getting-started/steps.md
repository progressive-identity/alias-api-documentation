# 5 steps to make Alias working

Alias creates a bridge between your real data stored in your systems and the legal rules that applies to them. 

To make this link possible, the DPO(s) and developer(s) of your company will need to follow 5 configurations steps.

1. The DPO digitizes the processing records in the Alias DPO UI. This processing records contain the GDPR rules that apply to the data in your system. When he is done, Alias will automatically create a document containing all the different data types (first name, phone number, IBAN...) concerning your users. 

2. From this data types document, the developer needs to identify where they are stored (in a bucket, in databases, in a CRM...) and send an JSON object to the Alias API containing the locations of this data types. 

3. The DPO receives the data type locations and bind each location with events that can affect the data according to the GDPR rules (ex: a user is created, a user has clicked on a newsletter...). This events are created in the Alias DPO UI by the DPO. Alias creates a document containing all the events that need to be notified to the Alias API.

4. The DPO creates events in the Alias DPO UI. This events, like "a user has been created" or "a user has clicked on a newsletter", will be used by Alias to determine what to do with the data. For example, Alias will be able to notify you if you need to archive some data because its conservation date has been reached.

5. The developer implements CRON Jobs in order to notify Alias of all the events that occured during the day for its users. 

And... that's all, you are all set. You can now monitor all your data, be notified when you have to delete or archive some data and check if you have your user's authorization to do something with their data (such as send marketing email).

If you have old data you need to tag with Alias, click here to know how you can do that.
If you want to monitor your users' consents, click here to see how to do that. 
