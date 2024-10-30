import React from "react";
import LicenseRequestRoot from "./LicenseRequestRoot";
export default function page() {
  return (
    <div className="  ">
      <div className="  ">
        <div className="text-2xl">Licensing</div>
        <div className="text-muted-foreground text-sm">
          Allows the user to request a license to SAP B1 base on allocated group
          and license type
        </div>
        <br />
        <LicenseRequestRoot />
      </div>
    </div>
  );
}
