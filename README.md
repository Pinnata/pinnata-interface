2021-09-06 01:58:11 PM
React project has been transferred to typescropt template. i'm merging all files here.

2021-09-06 02:23:41 PM

File merged of public and src root

02:39:43 PM

typescript version of react router has installed

02:45:02 PM

34 components; Alem, complete all js of pages folder. I'll handle components,context,data. once done, I'll start on pages folder too.


<code> onChange={(e) => {
              setRange(e.target.value);
              e.target.style.backgroundSize = `${range}% 100%`;
            }} </code>

            converted into 
<code>
             onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setRange((e.target as any).value);
              (e.target as any).style.backgroundSize = `${range}% 100%`;
            }}
</code>


03:30:44 PM

removeLastcontainer.tsx left

03:39:07 PM


removeLastcontainer.tsx done


03:45:56 PM

Components folder done


04:02:48 PM

Context aborted

04:18:43 PM

17 components done

11:10:37 PM

All components doe. except critical ones


2021-09-07 07:56:28 AM

For adding external event function

Javascript
<code>
const handleClick=(e)=> {
    if ((e.target.innerHTML === 'All') {
      setAll(true);
      setFarming(false);
      setLiquidity(false);
    }
  }

  onClick={handleClick}>
  </code>

typscript
<code>
const handleClick=(e: React.FormEvent< HTMLInputElement>): void=> {
    if ((e.target as any).innerHTML === 'All') {
      setAll(true);
      setFarming(false);
      setLiquidity(false);
    }
  }



onClick={(event:any)=>handleClick(event)}>
</code>



2021-09-08 11:11:16 AM

Fabar Issue unsolved