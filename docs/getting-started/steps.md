# 5 steps to setup Alias

Alias creates a bridge between the real data stored in your systems and the legal GDPR rules that apply to them. 

To make this possible, the DPO(s) and developer(s) of your company only have to follow 5 configuration steps.

1. The DPO digitizes the processing records in the Alias DPO UI. This processing records contain the GDPR rules that should apply to the data in your system. When he is done, Alias will automatically create a document containing all the different data types (first name, phone number, IBAN...) that you store about your users. 

2. From this data types document, the developer identifies where they are stored (in buckets, in databases, in CRMs...). Then, he sends a JSON object to the Alias API containing the locations of this data types. 

3. Data types are now bind with one or several locations. In the Alias DPO UI, the DPO can now bind each data type-locations couple with a specific purpose in a specific processing record. This step helps Alias to understand which rules (like the storage time) it should associate to each data store in your systems.

4. The DPO creates events in the Alias DPO UI. This events, like "a user has been created" or "a user has clicked on a newsletter", are used by Alias to update the context of data which are affected by this events. For example, Alias will be able to notify you when you will need to archive some data because its conservation date has been reached.

5. For new data, the developer implements CRON Jobs in order to notify Alias of all the events that occured during the day for its users.

And... that's all, you are all set. You can now monitor all your data, be notified when you have to delete or archive some data and check if you have your user's authorization to do something with their data (such as sending marketing email).

If you have old data you need to tag with Alias, click here to know how you can do that.

If you want to monitor your users' consents, click here to see how to do that. 
