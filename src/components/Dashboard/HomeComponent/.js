      // setChartData(genderType);

        // genderType.showAllEmployee.map((val:any)=>{
        //     console.log(val)
        // })
        // console.log(genderType.showAllEmployee)
        // if(val.genderTypeCount === "male"){
        //     Dispatch(setGenderTypeCount(val))            
        // }

        // if(val.genderTypeCount === "female"){
        //     val.femaleCount = state.femaleCount + 1                
        // }

        // if(val.genderTypeCount === "others"){
        //     val.othersCount = state.othersCount + 1                
        // }
        // console.log(genderType.showAllEmployee)


                // genderType.showAllEmployee.map((val: any) => {
        //     return Dispatch(setGenderTypeCount(val))
        // })

    // useEffect(()=>{
        
    //     fetchGenderType();
    // },[])

    useEffect(() => {
        const unsubscribe = subscribeToMore({
          document: show_all_employees_data_query,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newData = subscriptionData.data.showAllEmployee;
            const totalGenderTypeCounts = newData.length;
    
            // Dispatch Redux actions to update state
            newData.forEach((val:any) => Dispatch(setGenderTypeCount(val)));
            Dispatch(setCount(totalGenderTypeCounts));
    
            return { showAllEmployee: newData }; // Update query data
          },
        });
        console.log(count)

        return () => unsubscribe();
        
      }, [subscribeToMore, Dispatch]);