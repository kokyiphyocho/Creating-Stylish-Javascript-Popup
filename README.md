# ASP.NET Core-2.1 : Customize Login Form
This project demonstrate how to extend IdentityUser class and IdentityRole class to add customize field and role. It also shows how to customize Log-in form and Register form Layout using scaffolding. The sample of implementing multiple step registration form will also show in this project.

#### Output of the Project

##### Login Page

![Out Login](images/out_login.png)

##### Register Page

![Out Register](images/out_register.png)

#### Creating New project
In Visual studio 2017, create new ASP.NET 2.1 Core solution and select "Web Application (Model-View-Controller)" project with "Individual User Accounts" authentication.

![Dg Project](images/dg_project.png)

The new solution will created with following folders and files.

![Wd Solution](images/wd_solution.png)

#### Extend IdentityUser Class and IdentityRole Class

Create ApplicationUser.cs file in Models Folder and create ApplicationUser class with additional field that we require.

```C#
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityExtension.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser() : base() { }

        public string   FirstName     { get; set; }
        public string   LastName      { get; set; }
        public string   Gender        { get; set; }
        public DateTime DateOfBirth   { get; set; }        
        public string   MobileContact { get; set; }
        public string   HomeContact   { get; set; }
        public string   StreetAddress { get; set; }        
        public string   City          { get; set; }
        public string   PostalCode    { get; set; }
        public string   Province      { get; set; }
        public string   Country       { get; set; }
    }
}
```

Create ApplicationRole.cs file in Models Folder and create ApplicationRole class with additional properties, description and creationdate fields, and constructor to assign those properties.

```C#
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityExtension.Models
{
	public class ApplicationRole : IdentityRole
	{
		public string Description       { get; set; }
		public DateTime CreationDate    { get; set; }

		public ApplicationRole() : base() { }

		public ApplicationRole(string roleName) : base(roleName) { }

		public ApplicationRole(string roleName, string description, DateTime creationDate) : base(roleName)
		{
			this.Description    = description;
			this.CreationDate   = creationDate;
		}          
	}
}
```

#### Amend ApplicationDBContext Class

Amend the ApplicationDBContext class from Data\ApplicationDbContext.cs to inherit the ApplicationUser and ApplicationRole Classes.

```C#
using System;
using System.Collections.Generic;
using System.Text;
using IdentityExtension.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IdentityExtension.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
```

#### Create class for seeding user list

Create TestData.cs in DataFolder for seeding user records for testing. Create TestData class that implements asynchronous function clalled InitializeDB that insert role and user records intoto the database.

```C#
using IdentityExtension.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdentityExtension.Data
{
    public class TestData
    {
        public static async Task InitializeDB(ApplicationDbContext context,
                                              UserManager<ApplicationUser> userManager,
                                              RoleManager<ApplicationRole> roleManager)
        {
            context.Database.EnsureCreated();


            string adminRole = "Admin";
            string adminDescription = "Administrator Role";

            string memberRole = "Member";
            string memberDescription = "Member Description";

            string password = "P@ssw0rd";

            if (await roleManager.FindByNameAsync(adminRole) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(adminRole, adminDescription, DateTime.Now));
            }

            if (await roleManager.FindByNameAsync(memberRole) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(memberRole, memberDescription, DateTime.Now));
            }

            if (await userManager.FindByNameAsync("john@user.com") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "john@user.com",
                    Email = "john@user.com",
                    FirstName = "John",
                    LastName = "Smith",
                    DateOfBirth = new DateTime(1980, 11, 5),
                    Gender = "Male",
                    MobileContact = "+12 5555-5555",
                    HomeContact = "+23 5555-6666",
                    StreetAddress = "#08-2048, Blk 64, Yishun Avenue 6",
                    City = "Singapore",
                    PostalCode = "760064",
                    Province = "-",
                    Country = "Singapore",
                };

                var result = await userManager.CreateAsync(user);

                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, adminRole);
                };
            }

            if (await userManager.FindByNameAsync("william@user.com") == null)
            {

                var user = new ApplicationUser
                {
                    UserName = "william@user.com",
                    Email = "william@user.com",
                    FirstName = "William",
                    LastName = "Brown",
                    DateOfBirth = new DateTime(1982, 3, 12),
                    Gender = "Male",
                    MobileContact = "+12 3333-5555",
                    HomeContact = "+23 3333-6666",
                    StreetAddress = "#02-1024, Blk 512, Woodlands Avenue 2",
                    City = "Singapore",
                    PostalCode = "700512",
                    Province = "-",
                    Country = "Singapore",
                };

                var result = await userManager.CreateAsync(user);

                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, memberRole);
                }
            }

            if (await userManager.FindByNameAsync("david@user.com") == null)
            {

                var user = new ApplicationUser
                {
                    UserName = "david@user.com",
                    Email = "david@user.com",
                    FirstName = "David",
                    LastName = "Lim",
                    DateOfBirth = new DateTime(1975, 2, 21),
                    Gender = "Male",
                    MobileContact = "+12 3333-1111",
                    HomeContact = "+23 3333-1111",
                    StreetAddress = "#04-4096, Blk 128, Bedok North Avenue 2",
                    City = "Singapore",
                    PostalCode = "700128",
                    Province = "-",
                    Country = "Singapore",
                };

                var result = await userManager.CreateAsync(user);

                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, memberRole);
                }
            }

            if (await userManager.FindByNameAsync("taylor@user.com") == null)
            {

                var user = new ApplicationUser
                {
                    UserName = "taylor@user.com",
                    Email = "taylor@user.com",
                    FirstName = "Taylor",
                    LastName = "Koh",
                    DateOfBirth = new DateTime(1985, 5, 8),
                    Gender = "Female",
                    MobileContact = "+12 2222-5555",
                    HomeContact = "+23 2222-6666",
                    StreetAddress = "#02-128, Blk 256, Angmokio Avenue 2",
                    City = "Singapore",
                    PostalCode = "700512",
                    Province = "-",
                    Country = "Singapore",
                };

                var result = await userManager.CreateAsync(user);

                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, memberRole);
                }
            }

            if (await userManager.FindByNameAsync("brain@user.com") == null)
            {

                var user = new ApplicationUser
                {
                    UserName = "brain@user.com",
                    Email = "brain@user.com",
                    FirstName = "Brain",
                    LastName = "Foo",
                    DateOfBirth = new DateTime(1982, 3, 12),
                    Gender = "Male",
                    MobileContact = "+12 3333-8888",
                    HomeContact = "+23 3333-8888",
                    StreetAddress = "#02-1024, Blk 125, Bedok South Avenue 6",
                    City = "Singapore",
                    PostalCode = "700125",
                    Province = "-",
                    Country = "Singapore",
                };

                var result = await userManager.CreateAsync(user);

                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, memberRole);
                }
            }
        }
    }
}
```

#### Amend StartUp.cs and _LoginPartial.cshtml Files

In StratUp.cs file, remove the following line which use Default IdentityUser class with our new code that create Identity using ApplicationUser and ApplicationRole classes.

###### (Remove)
```C#	
	services.AddDefaultIdentity<IdentityUser>()
                .AddEntityFrameworkStores<ApplicationDbContext>();
```

###### (Add)
```C#
	services.AddIdentity<ApplicationUser, ApplicationRole>(
                options => options.Stores.MaxLengthForKeys = 128)
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultUI()
                .AddDefaultTokenProviders();

```

Add additional parameter to Configure function of Startup class in Startup.cs file.

###### (Existing)
```C#
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
```

###### (Amended)
```C#
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ApplicationDbContext context,
			RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager)
```

Add the end of the Conigure function, add a function call to TestData.InitializeDB(). As InitializeDB() is async function, we need to use Wait() to wait until task is completed.
```C#
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ApplicationDbContext context,
			RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager)
{
	....

	TestData.InitializeDB(context, userManager, roleManager).Wait();
}
```


In Views\Shared\_LoginPartial.cshtml file, amend dependcy injection of SingInManager and UserManager to use ApplicationUser model instead of IdentityUser.

###### (Existing)
```C#
@inject SignInManager<IdentityUser> SignInManager
@inject UserManager<IdentityUser> UserManager
```

###### (Amended)
```C#
@inject SignInManager<ApplicationUser> SignInManager
@inject UserManager<ApplicationUser> UserManager
```

#### Adding Migration and Updating Database

##### Command Prompt Method
##### <u>*Adding Migration*</u>

**C:\XXXX\XXXXX>** *dotnet ef migrations add ExtendItentity*

![Cmd Addmigration](images/cmd_addmigration.png)

##### <u>*Update Database*</u>

**C:\XXXX\XXXXX>** *dotnet ef database update*

![Cmd Updatedatabase](images/cmd_updatedatabase.png)

Update Database

##### Package Manager Console Method
##### <u>*Adding Migration*</u>

**PM >** *add-migration ExtendIdentity*

![Pkm Addmigration](images/pkm_addmigration.png)

##### <u>*Update Database*</u>
**PM >** *update-database*

![Pkm Updatedatabase](images/pkm_updatedatabase.png)'

*__ExtendIdentity__ is the name of migration and you can give any name.*

After this stage, database is already updated the columns that match with properties we added in ApplicationUser and ApplicationRole classes.


#### Scaffolding Identity UI

As Identity UI is embedded in the framework, we need to scaffold the Identity UI to customize it. To scaffold the Identity, right click on the project and select _**Add > New Scaffold**_ Item.

![Mnu Scaffold](images/mnu_scaffold.png)

Select the item named Identity from  "Add Scaffold" Dialog Box.

![Dg Scaffold](images/dg_scaffold.png)

At "Add Identity" dialog box, tick the _**Override all files**_ and Data context class combobox should select our ApplicationDBContext called _**ApplicationDBContect(IdentityExtension.Data)**_.

![Dg Addidentity](images/dg_addidentity.png)

After scaffolding, you will see a bunch of Identity UI related files are added to the solution under _**wwwroot\area\identity**_ folder.

![Wd Scaffolded](images/wd_scaffolded.png)


#### Preparation of _Layout.cshtml for Customizing
##### Modifying _Layout.cshtml 
To be easier to manage, we will remove the navigation bar from _Layout.cshtml and create new partial view for navigation bar.

Open file _**Views\Shared\_Layout.cshtml**_, cut the *&lt;nav&gt;* tag and replace with partial tag _**&lt;partial nameNavbar" /&gt;**_

```HTML
    <nav class="navbar navbar-inverse navbar-fixed-top">
        ...
    </nav>
```
At the end of the *&lt;head&gt;* tag in _Layout.cshtml file, add *page_css* section renderer to allow rendering of page specific css files.

At the end of the *&lt;body&gt;* tag in _Layout.cshtml file, add *page_script* section renderer to allow rendering of page specific script files.

For both section renderer, required parameter is false as this section is not mandatory and it will render if only render for the page those has special behaviour.
```HTML
<!DOCTYPE html>
<html>

<head>
	...

	@RenderSection("page_css", required:false)
</head>

<body>
	...

	@RenderSection("page_script", required: false)
</body>

</html>
```

##### Creating Partial View of Navigation Bar
Right click on the _**Views\Shared**_ select _**add / view**_ and create new partial view of Navigation Bar called _Navbar.cshtml.

![Dg Viewnavbar](images/dg_viewnavbar.png)

Open file _**Views\Shared\_Navbar.cshtml**_, paste the *&lt;nav&gt;* tag that copied from _Layout.cshtml.
For our case, the navigation bar will not render unless the customer is signed in. However, for Home Page it will render navigation bar regardless of login status.
The below code block shows how our _Navbar.cshtml look like.
```HTML
@using Microsoft.AspNetCore.Identity

@inject SignInManager<ApplicationUser> SignInManager

@if ((SignInManager.IsSignedIn(User)) || (ViewData["Title"].ToString() == "Home Page"))
{
	<nav class="navbar navbar-inverse navbar-fixed-top">	
		...      
		...
	</nav>
}
```

#### Customizing Login Page
##### Removing Right Panel
Open file _**Areas\Identity\Pages\Account\Login.cshtml.cshtml**_, remove the right panel div tag, 
*&lt;div class="col-md-6 col-md-offset-2"&gt;* .
```HTML
<div class="col-md-6 col-md-offset-2">

        ...

</div>
```
##### Add page_css Section and Wrapper Div

Add _**"@section page_css"**_ section before &lt;h2&gt; tag, as shown in the following code block. 
This section will load customize css file named form_login.css for styling.

```HTML
@page
@model LoginModel

@{
    ViewData["Title"] = "Log in";
}

@section page_css 
{    
    <link rel="stylesheet" href="~/css/form_login.css" type="text/css"  asp-append-version="true"/>    
}

<h2>@ViewData["Title"]</h2>
<div class="row">
	....   
</div>

...

```

Add wrapper div  _**&lt;div class="form_login"&gt;**_ which wrap &lt;h2&gt; tag and &lt;div class="row"&gt; tags.

```HTML
@page
@model LoginModel

@{
    ViewData["Title"] = "Log in";
}

@section page_css 
{    
    <link rel="stylesheet" href="~/css/form_login.css" type="text/css"  asp-append-version="true"/>    
}

<div class="form_login">

    <h2>@ViewData["Title"]</h2>

    <div class="row">
     ...        
    </div>    

</div>

...
```

##### Creating CSS file
Right click on the _**wwwroot\css**_ select _**add / new item**_ and add css file named form_login.css.
Add CSS rules that override the existing bootstrap styles. use @media quries to ensure not compromise in responsive behaviour. 
Align the Login dialog box in center of page and put box shadow for aesthetic purpose.

```CSS
.form_login {
    padding: 15px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #ddd;

    -webkit-box-shadow: 0 0 5px #eee;
    -moz-box-shadow: 0 0 5px #eee;
    box-shadow: 0 0 5px #eee;
}

@media (min-width: 992px) {
    .form_login {
        padding: 15px;
        width: 30%;
    }
}

.form_login h2,
.form_login .row {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}

.form_login .row .col-md-4 {
    width: 100%;
}
```

After adding CSS file, we have completed the customizing process of Login Page.


#### Customizing Register Page
Customizing Register page to multi-step page is relatively complicate as it require several major steps to accomplish.
Firstly we need to amend RegisterModel to adapt with new columns that we added eariler. 
After that we need to amend Razor Page to add UI Components and attributes to control validations and steps.
Finally, we need to javascript with AngularJS and jQuery for controlling script and steps.

##### Modifying RegisterModel class

Add Enum called Gender at the top of the RegisterModel class. This enum will be use by Gender select tag as option values.
 
```C#
public class RegisterModel : PageModel
{
	public enum Gender
	{
		Male = 1,
		Female = 2
	}

	...

	public class InputModel
	{	
		...
	}
}
```


Add properties of ApplicationUser model in the InputModel class. the property _**Step**_ is to control the registration 
steps.

```C#
 public class InputModel
{
    [Required]            
    [Display(Name = "Step")]
    public string Step { get; set; }

    [Required]
    [EmailAddress]
    [Display(Name = "Email")]
    public string Email { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    public string Password { get; set; }

    [DataType(DataType.Password)]
    [Display(Name = "Confirm password")]
    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    public string ConfirmPassword { get; set; }

    [Required]
    [DataType(DataType.Text)]
    [Display(Name = "First Name")]
    [StringLength(20, MinimumLength = 3, ErrorMessage ="The {0} must between {1} to {2} characters.")]
    public string FirstName { get; set; }

    [Required]
    [DataType(DataType.Text)]
    [Display(Name = "Last Name")]
    [StringLength(20, MinimumLength = 3, ErrorMessage = "The {0} must between {1} to {2} characters.")]
    public string LastName { get; set; }

    [Required]
    [DataType(DataType.Text)]
    [Display(Name = "Gender")]
    public string Gender { get; set; }

    [Required]
    [Display(Name = "Date of Birth")]
    [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
    public System.DateTime DateofBirth { get; set; }
                        
    [DataType(DataType.Text)]
    [Display(Name = "Mobile Contact No.")]
    [StringLength(20, MinimumLength = 3, ErrorMessage = "The {0} must between {1} to {2} characters.")]
    public string MobileContact { get; set; }
                        
    [DataType(DataType.Text)]
    [Display(Name = "Home Contact No.")]
    [StringLength(20, MinimumLength = 3, ErrorMessage = "The {0} must between {1} to {2} characters.")]
    public string HomeContact { get; set; }

    [Required]
    [DataType(DataType.Text)]
    [Display(Name = "Street Address")]            
    public string StreetAddress { get; set; }

    [Required]
    [DataType(DataType.Text)]
    [Display(Name = "City")]
    [StringLength(20, MinimumLength = 3, ErrorMessage = "The {0} must between {1} to {2} characters.")]
    public string City { get; set; }

    [Required]
    [DataType(DataType.Text)]
    [Display(Name = "Postal Code")]
    [StringLength(20, MinimumLength = 3, ErrorMessage = "The {0} must between {1} to {2} characters.")]
    public string PostalCode { get; set; }
                        
    [DataType(DataType.Text)]
    [Display(Name = "Province")]            
    public string Province { get; set; }

    [Required]
    [DataType(DataType.Text)]
    [Display(Name = "Country")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "The {0} must between {1} to {2} characters.")]
    public string Country { get; set; }            
}
```

Add additional columns of ApplicationUser model in the _**OnPostAsync**_ function which responsible to update to the database.
```C#
public async Task<IActionResult> OnPostAsync(string returnUrl = null)
{
    returnUrl = returnUrl ?? Url.Content("~/");
    if (ModelState.IsValid)
    {        
        var user = new ApplicationUser
        {
            UserName = Input.Email,
            Email = Input.Email,
            FirstName = Input.FirstName,
            LastName = Input.LastName,
            Gender = Input.Gender,
            DateOfBirth = Input.DateofBirth,
            MobileContact = Input.MobileContact,
            HomeContact = Input.HomeContact,
            StreetAddress = Input.StreetAddress,
            City = Input.City,
            PostalCode = Input.PostalCode,
            Province = Input.Province,
            Country = Input.Country,
        };

        var result = await _userManager.CreateAsync(user, Input.Password);
        
	...
    }

    ...
}
```

##### Modifying RegisterModel class

<u>**Add page_css Section and Wrapper Div**</u>

Add _**"@section page_css"**_ section and _**"@section page_script"**_ before &lt;h2&gt; tag, as shown in the 
following code block. These sections will load customize css file named form_register.css and 
customized javascript file form_register.js respectively.

```HTML
@page
@model RegisterModel
@{
    ViewData["Title"] = "Register";
}

@section page_css
{
    <link rel="stylesheet" href="~/css/form_register.css" type="text/css" asp-append-version="true" />
}

@section page_script
{
    <script src="~/js/form_register.js" asp-append-version="true"></script>
}

<h2>@ViewData["Title"]</h2>

<div class="row">
	...
</div>
...
```

Add wrapper div  _**&lt;div class="form_register" ng-app="registerApp" ng-controller="registerController"&gt;**_ which wrap &lt;h2&gt; tag and &lt;div class="row"&gt; tags. 
This wrapper div will also use for as AngularJS module and controller.

```HTML
@page
@model RegisterModel
@{
    ViewData["Title"] = "Register";
}

@section page_css
{
    <link rel="stylesheet" href="~/css/form_register.css" type="text/css" asp-append-version="true" />
}

@section page_script
{
    <script src="~/js/form_register.js" asp-append-version="true"></script>
}

<div class="form_register" ng-app="registerApp" ng-controller="registerController">

    <h2>@ViewData["Title"]</h2>

    <div class="row">

        ...

    </div>
</div>

...
```

<u>**Add Controls for the Additional Fields**</u>

In the _**&lt;div class="row"&gt;**_ Tag, we will populate the input controls for new fields of ApplicationUser model. 

```HTML
 <div class="row">
        <div class="col-md-4">
            <form asp-route-returnUrl="@Model.ReturnUrl" method="post">
                <h4>Create a new account.</h4>
                <div class="stepinfo">{{ stepinfo }}</div> @* bind with $scope.stepinfo *@
                <hr />
                <div asp-validation-summary="All" class="text-danger"></div>

                <div class="form-group" ng-hide="true"> @* always hide the step field, it just for control purpose*@
                    <label asp-for="Input.Step"></label>
                    <input asp-for="Input.Step" class="form-control" ng-model="step"/>
                    <span asp-validation-for="Input.Step" class="text-danger"></span>
                </div>

                <div class="form-group" ng-show="step==1"> @* This field will visible when $scope.step = 1 *@
                    <label asp-for="Input.FirstName"></label>
                    <input asp-for="Input.FirstName" class="form-control" />
                    <span asp-validation-for="Input.FirstName" class="text-danger"></span>
                </div>
                <div class="form-group" ng-show="step==1"> @* This field will visible when $scope.step = 1 *@
                    <label asp-for="Input.LastName"></label>
                    <input asp-for="Input.LastName" class="form-control" />
                    <span asp-validation-for="Input.LastName" class="text-danger"></span>
                </div>
                <div class="form-group" ng-show="step==1"> @* This field will visible when $scope.step = 1 *@
                    <label asp-for="Input.Gender"></label>					   
						@* Get opstions value from the Gender enum *@
                    <select asp-for="Input.Gender" asp-items="Html.GetEnumSelectList<RegisterModel.Gender>()" class="form-control"></select> 
                    <span asp-validation-for="Input.Gender" class="text-danger"></span>
                </div>
                <div class="form-group" ng-show="step==1"> @* This field will visible when $scope.step = 1 *@
                    <label asp-for="Input.DateofBirth"></label>
                    <input asp-for="Input.DateofBirth" class="form-control" />
                    <span asp-validation-for="Input.DateofBirth" class="text-danger"></span>
                </div>
                <div class="form-group" ng-show="step==3"> @* This field will visible when $scope.step = 3 *@
                    <label asp-for="Input.MobileContact"></label>
                    <input asp-for="Input.MobileContact" class="form-control" />
                    <span asp-validation-for="Input.MobileContact" class="text-danger"></span>
                </div>
                <div class="form-group" ng-show="step==3"> @* This field will visible when $scope.step = 3 *@
                    <label asp-for="Input.HomeContact"></label>
                    <input asp-for="Input.HomeContact" class="form-control" />
                    <span asp-validation-for="Input.HomeContact" class="text-danger"></span>
                </div>
                <div class="form-group" ng-show="step==2"> @* This field will visible when $scope.step = 2 *@
                    <label asp-for="Input.StreetAddress"></label>
                    <input asp-for="Input.StreetAddress" class="form-control" />
                    <span asp-validation-for="Input.StreetAddress" class="text-danger"></span>
                </div>
                <div class="form-group" ng-show="step==2"> @* This field will visible when $scope.step = 2 *@
                    <label asp-for="Input.City"></label>
                    <input asp-for="Input.City" class="form-control" />
                    <span asp-validation-for="Input.City" class="text-danger"></span>
                </div>
                <div class="form-group" ng-show="step==2"> @* This field will visible when $scope.step = 2 *@
                    <label asp-for="Input.PostalCode"></label>
                    <input asp-for="Input.PostalCode" class="form-control" />
                    <span asp-validation-for="Input.PostalCode" class="text-danger"></span>
                </div>
                <div class="form-group" ng-show="step==2"> @* This field will visible when $scope.step = 2 *@
                    <label asp-for="Input.Province"></label>
                    <input asp-for="Input.Province" class="form-control" />
                    <span asp-validation-for="Input.Province" class="text-danger"></span>
                </div>
                <div class="form-group" ng-show="step==2"> @* This field will visible when $scope.step = 2 *@
                    <label asp-for="Input.Country"></label>
                    <input asp-for="Input.Country" class="form-control" />
                    <span asp-validation-for="Input.Country" class="text-danger"></span>
                </div>

                <div class="form-group" ng-show="step==3"> @* This field will visible when $scope.step = 3 *@
                    <label asp-for="Input.Email"></label>
                    <input asp-for="Input.Email" class="form-control" />
                    <span asp-validation-for="Input.Email" class="text-danger"></span>
                </div>
                <div class="form-group" ng-show="step==3">@* This field will visible when $scope.step = 3 *@
                    <label asp-for="Input.Password"></label>
                    <input asp-for="Input.Password" class="form-control" />
                    <span asp-validation-for="Input.Password" class="text-danger"></span>
                </div>
                <div class="form-group" ng-show="step==3"> @* This field will visible when $scope.step = 3 *@
                    <label asp-for="Input.ConfirmPassword"></label>
                    <input asp-for="Input.ConfirmPassword" class="form-control" />
                    <span asp-validation-for="Input.ConfirmPassword" class="text-danger"></span>
                </div>
					
		@* Previous button will visible when $scope.step > 1 *@
		<button type="button" class="btn _prevbtn" ng-show="step>1" ng-click="previousStep()">&ltPrevious</button>

		@* Next button will visible when $scope.step < 3 (Maximum Step) *@
		<button type="button" class="btn" ng-show="step<3" ng-click="nextStep()">Next&gt</button>

		@* Register button will visible when $scope.step = 3 (Maximum Step) *@	
		<button type="submit" class="btn btn-default" ng-show="step==3">Register</button>
            </form>
        </div>
    </div>
```


##### Creating CSS file
Right click on the _**wwwroot\css**_ select _**add / new item**_ and add css file named form_register.css.
Add CSS rules that override the existing bootstrap styles. use @media quries to ensure not compromise in responsive behaviour. 
Align the Login dialog box in center of page and put box shadow for aesthetic purpose.

_**body:not([fa-initialized])**_ tag is to ensure page is not visible until angular.controller is fully initialized the controls.
This is to avoid screen flickering while angular.controller is show or hide controls according to relevant Step No. .


```CSS
body:not([fa-initialized])
{
    display: none;
}

.form_register {
    padding: 15px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #ddd;

    -webkit-box-shadow: 0 0 5px #eee;
    -moz-box-shadow: 0 0 5px #eee;
    box-shadow: 0 0 5px #eee;
}

@media (min-width: 992px) {
    .form_register {
        padding: 15px;
        width: 30%;
    }
}

.form_register h2,
.form_register .row 
{
    width: 100%;
    margin-left:auto;
    margin-right:auto;
}

.form_register .row .col-md-4 
{
    width: 100%;
}

.form_register .btn
{
    width : 100px;
    float : right;
}

.form_register ._prevbtn
{
    float : left;
}
```

##### Creating Javascript file
Right click on the _**wwwroot\js**_ select _**add / new item**_ and add javascript file named form_register.js.

The following javascript code will add _**fa-initialized**_ attribute to body and this will display the page.

`registerForm.closest('body').attr('fa-initialized', 'true');` {:.language-javascript} 



The following javascript code will ensure to get correct step if server validation is fail and page is refreshed.

`if ((!isNaN(stepInput.val())) && (Number(stepInput.val()) > 0)) $scope.step = Number(stepInput.val());    
else $scope.step = 1;`{:.language-javascript}

The full javascript for controlling multi-step registration process.

```JAVASCRIPT
var registerApp = angular.module('registerApp', []);

registerApp.config(function ($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true)
});

registerApp.controller('registerController', function ($scope) {
    var stepTemplate    = 'Step $STEP of 3';
    var maxStep         = 3;
    var registerForm    = $('div .form_register form');
    var stepInput       = $('div.form-group input[name="Input.Step"]');

    // Initialize the step.
    if ((!isNaN(stepInput.val())) && (Number(stepInput.val()) > 0)) $scope.step = Number(stepInput.val());
    else $scope.step = 1;

    // Prvent screen flickering.
    registerForm.closest('body').attr('fa-initialized', 'true');

    $scope.stepinfo = "";

    $scope.refreshValue = function () {
        $scope.stepinfo = stepTemplate.replace('$STEP', $scope.step);
    };

    $scope.nextStep = function () {        
        
        if (($scope.step < maxStep) && ($scope.validateStep()))
        {
            $scope.step = $scope.step + 1;
            $scope.refreshValue();
        }
    }

    $scope.previousStep = function () {
        if ($scope.step > 1) {
            $scope.step = $scope.step - 1;
            $scope.refreshValue();
        }
    }

    $scope.validateStep = function () {
        
        var elementList = registerForm.find('div.form-group[ng-show="step==' + $scope.step + '"] input[name]');
        var validator = registerForm.validate();
        var success = true;

	// Validate each elements belong to particular step.
        elementList.each(function () {
            if (!validator.element('div.form-group input[name="' + $(this).attr('name') + '"]'))
            {
                success = false;
                return (false);
            }
        });

        return (success);
    }

    $scope.refreshValue();    
});
```

After javascript file is created, the customization process is successfully done.


Kyi Phyo Cho@Albert Cho